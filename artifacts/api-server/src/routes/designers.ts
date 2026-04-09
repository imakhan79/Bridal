import { Router } from "express";
import { db } from "@workspace/db";
import { designersTable } from "@workspace/db";

export const designersRouter = Router();

designersRouter.get("/", async (req, res) => {
  try {
    const designers = await db.select().from(designersTable);
    res.json({ designers });
  } catch (err) {
    req.log.error({ err }, "Error listing designers");
    res.status(500).json({ error: "Internal server error" });
  }
});
