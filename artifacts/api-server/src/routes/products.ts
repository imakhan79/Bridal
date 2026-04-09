import { Router } from "express";
import { db } from "@workspace/db";
import { productsTable } from "@workspace/db";
import { eq, and, gte, lte, like, desc, asc, ilike } from "drizzle-orm";
import { ListProductsQueryParams, GetNewArrivalsQueryParams, GetProductParams, GetRelatedProductsParams } from "@workspace/api-zod";

export const productsRouter = Router();

productsRouter.get("/", async (req, res) => {
  try {
    const parsed = ListProductsQueryParams.safeParse(req.query);
    const params = parsed.success ? parsed.data : {};

    const conditions = [];

    if (params.occasion) {
      conditions.push(ilike(productsTable.occasion, `%${params.occasion}%`));
    }
    if (params.fabric) {
      conditions.push(ilike(productsTable.fabric, `%${params.fabric}%`));
    }
    if (params.designer) {
      conditions.push(ilike(productsTable.brand, `%${params.designer}%`));
    }
    if (params.collection) {
      conditions.push(eq(productsTable.collection, params.collection));
    }
    if (params.season) {
      conditions.push(ilike(productsTable.season, `%${params.season}%`));
    }
    if (params.minPrice !== undefined) {
      conditions.push(gte(productsTable.priceUsd, String(params.minPrice)));
    }
    if (params.maxPrice !== undefined) {
      conditions.push(lte(productsTable.priceUsd, String(params.maxPrice)));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    let orderBy;
    if (params.sort === "price_asc") {
      orderBy = asc(productsTable.priceUsd);
    } else if (params.sort === "price_desc") {
      orderBy = desc(productsTable.priceUsd);
    } else if (params.sort === "newest") {
      orderBy = desc(productsTable.createdAt);
    } else {
      orderBy = desc(productsTable.isFeatured);
    }

    const allProducts = await db.select().from(productsTable).where(whereClause).orderBy(orderBy);
    const total = allProducts.length;

    const offset = params.offset ?? 0;
    const limit = params.limit ?? 20;
    const products = allProducts.slice(offset, offset + limit);

    res.json({
      products: products.map(serializeProduct),
      total,
    });
  } catch (err) {
    req.log.error({ err }, "Error listing products");
    res.status(500).json({ error: "Internal server error" });
  }
});

productsRouter.get("/featured", async (req, res) => {
  try {
    const products = await db.select().from(productsTable).where(eq(productsTable.isFeatured, true)).limit(8);
    res.json({ products: products.map(serializeProduct) });
  } catch (err) {
    req.log.error({ err }, "Error getting featured products");
    res.status(500).json({ error: "Internal server error" });
  }
});

productsRouter.get("/new-arrivals", async (req, res) => {
  try {
    const parsed = GetNewArrivalsQueryParams.safeParse(req.query);
    const limit = parsed.success ? (parsed.data.limit ?? 8) : 8;
    const products = await db.select().from(productsTable).where(eq(productsTable.isNew, true)).orderBy(desc(productsTable.createdAt)).limit(limit);
    res.json({ products: products.map(serializeProduct) });
  } catch (err) {
    req.log.error({ err }, "Error getting new arrivals");
    res.status(500).json({ error: "Internal server error" });
  }
});

productsRouter.get("/:slug/related", async (req, res) => {
  try {
    const parsed = GetRelatedProductsParams.safeParse(req.params);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid params" });
    }
    const { slug } = parsed.data;
    const product = await db.select().from(productsTable).where(eq(productsTable.slug, slug)).limit(1);
    if (product.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    const allOthers = await db
      .select()
      .from(productsTable)
      .orderBy(desc(productsTable.isFeatured));
    const sameOccasion = allOthers.filter((p) => p.slug !== slug && p.occasion === product[0].occasion);
    const fallback = allOthers.filter((p) => p.slug !== slug);
    const results = sameOccasion.length >= 2 ? sameOccasion : fallback;
    res.json({ products: results.slice(0, 4).map(serializeProduct) });
  } catch (err) {
    req.log.error({ err }, "Error getting related products");
    res.status(500).json({ error: "Internal server error" });
  }
});

productsRouter.get("/:slug", async (req, res) => {
  try {
    const parsed = GetProductParams.safeParse(req.params);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid params" });
    }
    const { slug } = parsed.data;
    const products = await db.select().from(productsTable).where(eq(productsTable.slug, slug)).limit(1);
    if (products.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(serializeProduct(products[0]));
  } catch (err) {
    req.log.error({ err }, "Error getting product");
    res.status(500).json({ error: "Internal server error" });
  }
});

function serializeProduct(p: typeof productsTable.$inferSelect) {
  return {
    ...p,
    priceUsd: p.priceUsd !== null ? Number(p.priceUsd) : null,
    pricePkr: p.pricePkr !== null ? Number(p.pricePkr) : null,
    createdAt: p.createdAt.toISOString(),
  };
}
