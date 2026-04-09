import { Router, type IRouter } from "express";
import healthRouter from "./health";
import { productsRouter } from "./products";
import { collectionsRouter } from "./collections";
import { designersRouter } from "./designers";
import { reviewsRouter } from "./reviews";
import { inquiriesRouter } from "./inquiries";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/products", productsRouter);
router.use("/collections", collectionsRouter);
router.use("/designers", designersRouter);
router.use("/reviews", reviewsRouter);
router.use("/inquiries", inquiriesRouter);

export default router;
