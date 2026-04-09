import { pgTable, serial, text, numeric, boolean, timestamp, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const productsTable = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  brand: text("brand").notNull(),
  sku: text("sku").notNull().unique(),
  description: text("description").notNull(),
  priceUsd: numeric("price_usd", { precision: 10, scale: 2 }),
  pricePkr: numeric("price_pkr", { precision: 12, scale: 2 }),
  priceOnRequest: boolean("price_on_request").notNull().default(false),
  images: jsonb("images").$type<string[]>().notNull().default([]),
  fabric: text("fabric").notNull(),
  pieces: integer("pieces").notNull().default(1),
  colors: jsonb("colors").$type<string[]>().notNull().default([]),
  embroidery: text("embroidery").notNull(),
  occasion: text("occasion").notNull(),
  season: text("season").notNull(),
  deliveryTime: text("delivery_time").notNull(),
  availability: text("availability").notNull().default("in_stock"),
  isNew: boolean("is_new").notNull().default(false),
  isFeatured: boolean("is_featured").notNull().default(false),
  tags: jsonb("tags").$type<string[]>().notNull().default([]),
  collection: text("collection"),
  sizes: jsonb("sizes").$type<string[]>().notNull().default(["S", "M", "L", "XL"]),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertProductSchema = createInsertSchema(productsTable).omit({ id: true, createdAt: true });
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof productsTable.$inferSelect;
