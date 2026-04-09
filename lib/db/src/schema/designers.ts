import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const designersTable = pgTable("designers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  logoImage: text("logo_image").notNull(),
  coverImage: text("cover_image").notNull(),
  productCount: integer("product_count").notNull().default(0),
});

export const insertDesignerSchema = createInsertSchema(designersTable).omit({ id: true });
export type InsertDesigner = z.infer<typeof insertDesignerSchema>;
export type Designer = typeof designersTable.$inferSelect;
