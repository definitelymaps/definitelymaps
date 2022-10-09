import { Knex } from "knex";

export const up = async (db: Knex): Promise<void> => {
  // TODO
};

export const down = async (db: Knex): Promise<void> => {
  // leave empty; we only ever do forward-migrations
};
