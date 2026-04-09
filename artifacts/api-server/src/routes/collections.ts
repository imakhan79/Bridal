import { Router } from "express";
import { db } from "@workspace/db";
import { collectionsTable, productsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { GetCollectionParams } from "@workspace/api-zod";

export const collectionsRouter = Router();

collectionsRouter.get("/", async (req, res) => {
  try {
    const collections = await db.select().from(collectionsTable);
    res.json({ collections });
  } catch (err) {
    req.log.error({ err }, "Error listing collections");
    res.status(500).json({ error: "Internal server error" });
  }
});

collectionsRouter.get("/:slug", async (req, res) => {
  try {
    const parsed = GetCollectionParams.safeParse(req.params);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid params" });
    }
    const { slug } = parsed.data;
    const collections = await db.select().from(collectionsTable).where(eq(collectionsTable.slug, slug)).limit(1);
    if (collections.length === 0) {
      return res.status(404).json({ error: "Collection not found" });
    }
    const products = await db.select().from(productsTable).where(eq(productsTable.collection, slug));
    res.json({
      collection: collections[0],
      products: products.map((p) => ({
        ...p,
        priceUsd: p.priceUsd !== null ? Number(p.priceUsd) : null,
        pricePkr: p.pricePkr !== null ? Number(p.pricePkr) : null,
        createdAt: p.createdAt.toISOString(),
      })),
    });
  } catch (err) {
    req.log.error({ err }, "Error getting collection");
    res.status(500).json({ error: "Internal server error" });
  }
});
