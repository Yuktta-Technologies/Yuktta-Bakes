import { Request, Response } from "express";
import {
  fetchAllProducts,
  fetchProductBySlug,
} from "../services/product.service";

/**
 * GET /api/products
 */
export async function getAllProducts(
  _req: Request,
  res: Response
): Promise<void> {
  try {
    const products = await fetchAllProducts();

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      message: "Failed to fetch products",
    });
  }
}

/**
 * GET /api/products/:slug
 */
export async function getProductBySlug(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { slug } = req.params;

    if (!slug) {
      res.status(400).json({
        message: "Product slug is required",
      });
      return;
    }

    const product = await fetchProductBySlug(slug);

    if (!product) {
      res.status(404).json({
        message: "Product not found or unavailable",
      });
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({
      message: "Failed to fetch product",
    });
  }
}
