import produce from "immer";
import { io, Socket } from "socket.io-client";

import guid from "./guid";
import { useStore } from "./store";
import { setClickTimer, setHoverTimer } from "./cron";


// All typed events we receive from the websocket server
interface DownstreamEvents {
  viewers: (n: number) => void;

  mouseClick: (userTag: string, lng: number, lat: number, z: number) => void;
  mouseHover: (userTag: string, lng: number, lat: number, z: number) => void;
}

// All typed events we send to the websocket server
interface UpstreamEvents {
  mouseClick: (userTag: string, lng: number, lat: number, z: number) => void;
  mouseHover: (userTag: string, lng: number, lat: number, z: number) => void;
}

// The main websocket connection to the server; typed events to receive and send
export const socket: Socket<DownstreamEvents, UpstreamEvents> = io("http://localhost:5000", {
  path: "/v1/events/",
  transports: ["websocket"],
});

// Fired when we (re-)connect to the websocket server
socket.on("connect", () => {
  useStore.setState(
    produce((state) => {
      state.online = true;
    })
  );

  setClickTimer();
  setHoverTimer();
});

// Fired when we disconnect (for whatever reasons) from the websocket server
socket.on("disconnect", () => {
  useStore.setState(
    produce((state) => {
      state.online = false;
    })
  );
});

// The server broadcasts when new clients are joining/leaving,
// here we receive this event and update our store accordingly
socket.on("viewers", (n: number) => {
  useStore.setState(
    produce((state) => {
      state.viewers = n;
    })
  );
});

// Receive other user's mouse click events from the server
socket.on("mouseClick", (userTag: string, lng: number, lat: number, z: number) => {
  const mapZ = useStore.getState().z;
  const [w, s, e, n] = useStore.getState().bounds;

  if (Math.abs(z - mapZ) >= 3) {
    return
  }

  if (lng < w || lng > e || lat < s || lng > n) {
    return;
  }

  useStore.setState(
    produce((state) => {
      state.clicks.push({
        tag: guid(),
        z: z,
        lng: lng,
        lat: lat,
        received: Date.now(),
      });
    })
  );

  //console.log(`Other user clicked on ${lng}, ${lat}`);
});

// Receive other user's mouse hover events from the server
socket.on("mouseHover", (userTag: string, lng: number, lat: number, z: number) => {
  const mapZ = useStore.getState().z;
  const [w, s, e, n] = useStore.getState().bounds;

  if (Math.abs(z - mapZ) >= 3) {
    return
  }

  if (lng < w || lng > e || lat < s || lng > n) {
    return;
  }

  useStore.setState(
    produce((state) => {
      state.hovers.push({
        tag: guid(),
        z: z,
        lng: lng,
        lat: lat,
        received: Date.now(),
      });
    })
  );

  //console.log(`Other user hovered over ${lng}, ${lat}`);
});

// Send mouse clicks from the map to the server
export const onMapMouseClickEmit = async (userTag: string, lng: number, lat: number, z: number) => {
  socket.volatile.emit("mouseClick", userTag, lng, lat, z);
};

// Send mouse hovers from the map to the server
export const onMapMouseHoverEmit = async (userTag: string, lng: number, lat: number, z: number) => {
  socket.volatile.emit("mouseHover", userTag, lng, lat, z);
};
