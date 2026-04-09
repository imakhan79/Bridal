import { Router } from "express";
import { db } from "@workspace/db";
import { inquiriesTable } from "@workspace/db";
import { CreateInquiryBody } from "@workspace/api-zod";

export const inquiriesRouter = Router();

inquiriesRouter.post("/", async (req, res) => {
  try {
    const parsed = CreateInquiryBody.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid request body", details: parsed.error.issues });
    }
    const { name, email, phone, dressInterest, message } = parsed.data;
    const [inquiry] = await db
      .insert(inquiriesTable)
      .values({ name, email, phone: phone ?? null, dressInterest: dressInterest ?? null, message })
      .returning();
    res.status(201).json({
      ...inquiry,
      createdAt: inquiry.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Error creating inquiry");
    res.status(500).json({ error: "Internal server error" });
  }
});
