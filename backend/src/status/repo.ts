import type { Knex } from "knex";

class Repository {
  constructor(private db: Knex) {}

  async connected(): Promise<boolean> {
    try {
      await this.db.raw("select 1");

      return true;
    } catch (e: any) {
      return false;
    }
  }
}

export default Repository;
