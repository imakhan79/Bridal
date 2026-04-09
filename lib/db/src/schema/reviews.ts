import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const reviewsTable = pgTable("reviews", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  location: text("location").notNull(),
  rating: integer("rating").notNull(),
  text: text("text").notNull(),
  productName: text("product_name").notNull(),
  avatarUrl: text("avatar_url"),
});

export const insertReviewSchema = createInsertSchema(reviewsTable).omit({ id: true });
export type InsertReview = z.infer<typeof insertReviewSchema>;
export type Review = typeof reviewsTable.$inferSelect;
