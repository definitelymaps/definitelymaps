export interface Env {
  deployment: "development" | "production";
  app: {
    host: string;
    port: number;
  };
  db: {
    host: string;
    port: number;
    user: string;
    pass: string;
    name: string;
  };
}

const parseEnv = (): Env => {
  const deployment = process.env.NODE_ENV;
  const appHost = process.env.APP_HOST;
  const appPort = process.env.APP_PORT;
  const dbHost = process.env.POSTGRES_HOST;
  const dbPort = process.env.POSTGRES_PORT;
  const dbUser = process.env.POSTGRES_USER;
  const dbPass = process.env.POSTGRES_PASSWORD;
  const dbName = process.env.POSTGRES_DATABASE;

  if (!deployment) {
    throw new Error("env var NODE_ENV is not set");
  }

  if (!appHost) {
    throw new Error("env var APP_HOST is not set");
  }

  if (!appPort) {
    throw new Error("env var APP_PORT is not set");
  }

  if (!dbHost) {
    throw new Error("env var POSTGRES_HOST is not set");
  }

  if (!dbPort) {
    throw new Error("env var POSTGRES_PORT is not set");
  }

  if (!dbUser) {
    throw new Error("env var POSTGRES_USER is not set");
  }

  if (!dbPass) {
    throw new Error("env var POSTGRES_PASSWORD is not set");
  }

  if (!dbName) {
    throw new Error("env var POSTGRES_DATABASE is not set");
  }

  if (deployment !== "development" && deployment !== "production") {
    throw new Error("env var NODE_ENV is not 'development' or 'production'");
  }

  const parsedAppPort = parseInt(appPort, 10);

  if (isNaN(parsedAppPort)) {
    throw new Error("env var APP_PORT is not a number");
  }

  const parsedDbPort = parseInt(dbPort, 10);

  if (isNaN(parsedDbPort)) {
    throw new Error("env var POSTGRES_PORT is not a number");
  }

  return {
    deployment: deployment,
    app: {
      host: appHost,
      port: parsedAppPort,
    },
    db: {
      host: dbHost,
      port: parsedDbPort,
      user: dbUser,
      pass: dbPass,
      name: dbName,
    },
  };
};

export default parseEnv;
