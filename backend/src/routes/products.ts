import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: { isAvailable: true },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
        options: {                 
          include: {
            values: true,
          },
        },
        prices: {
          where: { isAvailable: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const response = products.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      category: p.category,
      description: p.description,
      imageUrl: p.imageUrl,
      videoUrl: p.videoUrl,
      tags: p.tags.map((t) => t.tag.name),

      options: p.options.map((opt) => ({
        name: opt.name,
        label: opt.label,
        values: opt.values
          .filter((v) => v.isAvailable)
          .map((v) => ({
            code: v.code,
            label: v.label,
          })),
      })),

      prices: p.prices.map((price) => ({
        id: price.id,
        combination: price.combination,
        price: price.price,
      })),
    }));

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

// GET /api/products/:slug
router.get("/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
        options: {
          include: {
            values: {
              where: { isAvailable: true },
            },
          },
        },
        prices: {
          where: { isAvailable: true },
        },
      },
    });

    if (!product || !product.isAvailable) {
      return res.status(404).json({ message: "Product not found" });
    }

    const response = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      category: product.category,
      description: product.description,
      imageUrl: product.imageUrl,
      videoUrl: product.videoUrl,
      tags: product.tags.map((t) => t.tag.name),

      options: product.options.map((opt) => ({
        name: opt.name,
        label: opt.label,
        values: opt.values.map((v) => ({
          code: v.code,
          label: v.label,
        })),
      })),

      prices: product.prices.map((price) => ({
        id: price.id,
        combination: price.combination,
        price: price.price,
      })),
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch product" });
  }
});



export default router;
