import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: { isAvailable: true },
      include: {
        variants: {
          orderBy: { price: "asc" },
        },
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

export default router;
