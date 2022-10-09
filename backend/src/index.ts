import { createServer } from "http";
import express from "express";
import pino from "pino-http";
import pretty from "pino-pretty";
import cors from "cors";
import { knex } from "knex";
import { Server } from "socket.io";

import parseEnv from "./env";
import knexConfig from "./knexfile";

import StatusRepository from "./status/repo";
import StatusRouter from "./status/router";


const app = express();

app.disable("x-powered-by");
app.use(express.json());

const env = parseEnv();
app.set("env", env);

if (env.deployment === "development") {
  const stream = pretty({ sync: true });
  const logger = pino({ autoLogging: false }, stream);

  app.use(logger);
  app.use(cors());
} else {
  app.use(pino());
  app.use(cors({ origin: "*" })); // TODO: deploy domain goes here
}

const db = knex(knexConfig[env.deployment]);

app.set("repo", {
  status: new StatusRepository(db),
});

app.use("/v1/status", StatusRouter);

app.use((req, res, next) => {
  req.log.error("not found");
  res.status(404).end();
});

const httpServer = createServer(app);

interface DownstreamEvents {
  viewers: (n: number) => void;
  mouseClick: (userTag: string, lng: number, lat: number, z: number) => void;
  mouseHover: (userTag: string, lng: number, lat: number, z: number) => void;
}

interface UpstreamEvents {
  mouseClick: (userTag: string, lng: number, lat: number, z: number) => void;
  mouseHover: (userTag: string, lng: number, lat: number, z: number) => void;
}

const io = new Server<UpstreamEvents, DownstreamEvents>(httpServer, {
  path: "/v1/events/",
  serveClient: false,
  maxHttpBufferSize: 1e8, // 10 MB max per message,
  transports: ["websocket"],
  cors: {
    origin: "*",
  }
});

io.on("connection", (socket) => {
  socket.on("mouseClick", (userTag: string, lng: number, lat: number, z: number) => {
    socket.broadcast.emit("mouseClick", userTag, lng, lat, z);
  });

  socket.on("mouseHover", (userTag: string, lng: number, lat: number, z: number) => {
    socket.broadcast.emit("mouseHover", userTag, lng, lat, z);
  });

  socket.emit("viewers", io.engine.clientsCount);
  socket.broadcast.emit("viewers", io.engine.clientsCount);

  socket.on("disconnect", (reason) => {
    socket.broadcast.emit("viewers", io.engine.clientsCount);
  });
});

httpServer.listen(env.app.port, env.app.host);
