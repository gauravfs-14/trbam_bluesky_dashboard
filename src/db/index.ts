import Database from "better-sqlite3";
import path from "path";
import { drizzle } from "drizzle-orm/better-sqlite3";

// Construct the absolute path to your database file.
const dbPath = path.join(
  process.cwd(),
  "src/app/api/posts/trbam_bluesky_posts.db"
);
console.log("Database path:", dbPath);

// Initialize better-sqlite3 connection and Drizzle ORM.
const sqlite = new Database(dbPath);
export const drizzleDb = drizzle(sqlite);
