import type { Config } from "drizzle-kit";
const { POSTGRES_URL } = process.env;
if (!POSTGRES_URL) {
	throw new Error("No url");
}
export default {
	schema: "./src/db/schema.ts",
	breakpoints: true,
	out: "./migrations",
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.POSTGRES_URL!
	}
} satisfies Config;
