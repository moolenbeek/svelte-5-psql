import { POSTGRES_URL } from "$env/static/private";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
const pool = new pg.Pool({
	connectionString: POSTGRES_URL
});

await pool.connect();
const db = drizzle(pool);

export default db;
