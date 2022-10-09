import type { Knex } from "knex";

import parseEnv from "./env";

const env = parseEnv();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      host: env.db.host,
      port: env.db.port,
      user: env.db.user,
      password: env.db.pass,
      database: env.db.name,
    },
    migrations: {
      tableName: "migrations",
    },
    acquireConnectionTimeout: 1000,
  },

  production: {
    client: "pg",
    connection: {
      host: env.db.host,
      port: env.db.port,
      user: env.db.user,
      password: env.db.pass,
      database: env.db.name,
    },
    migrations: {
      tableName: "migrations",
    },
    acquireConnectionTimeout: 1000,
  },
};

export default config;
