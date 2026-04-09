import { Router } from "express";
import { db } from "@workspace/db";
import { reviewsTable } from "@workspace/db";

export const reviewsRouter = Router();

reviewsRouter.get("/", async (req, res) => {
  try {
    const reviews = await db.select().from(reviewsTable);
    res.json({ reviews });
  } catch (err) {
    req.log.error({ err }, "Error listing reviews");
    res.status(500).json({ error: "Internal server error" });
  }
});
