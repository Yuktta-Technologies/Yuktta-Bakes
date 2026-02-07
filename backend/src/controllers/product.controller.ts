import { Request, Response } from "express";
import {
  fetchAllProducts,
  fetchProductBySlug,
} from "../services/product.service";

export async function getProducts(_req: Request, res: Response) {
  try {
    const products = await fetchAllProducts();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
}

export async function getProductBySlug(
  req: Request,
  res: Response
) {
  try {
    const { slug } = req.params;
    const product = await fetchProductBySlug(slug);

    if (!product) {
      return res.status(404).json({ message: "Product not available" });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch product" });
  }
}
