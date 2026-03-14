import { Pool } from "pg";

declare global {
  // eslint-disable-next-line no-var
  var __idmsPool: Pool | undefined;
}

export const pool =
  global.__idmsPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
  });

if (process.env.NODE_ENV !== "production") {
  global.__idmsPool = pool;
}
