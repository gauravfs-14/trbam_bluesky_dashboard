// src/db/schema.ts
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const posts = sqliteTable("posts", {
  id: text("id").primaryKey(),
  author: text("author"),
  text: text("text"),
  created_at: text("created_at"),
  indexed_at: text("indexed_at"),
  like_count: integer("like_count"),
  reply_count: integer("reply_count"),
  repost_count: integer("repost_count"),
  quote_count: integer("quote_count"),
  raw_data: text("raw_data"),
});
