import { Request, Response } from "express";
import {
  authenticateAdmin,
  toggleProductAvailability,
  toggleVariantValueAvailability,
  togglePriceAvailability,
} from "../services/admin.service";

/**
 * ADMIN LOGIN
 */
export async function adminLogin(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const result = await authenticateAdmin(email, password);

    if (!result) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      token: result.token,
      admin: {
        id: result.admin.id,
        email: result.admin.email,
        name: result.admin.name,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
}

/**
 * TOGGLE PRODUCT AVAILABILITY
 */
export async function updateProductAvailability(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { isAvailable } = req.body;

    if (typeof isAvailable !== "boolean") {
      return res.status(400).json({ message: "isAvailable must be boolean" });
    }

    const updated = await toggleProductAvailability(id, isAvailable);
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update product" });
  }
}

/**
 * TOGGLE VARIANT VALUE AVAILABILITY
 */
export async function updateVariantValueAvailability(
  req: Request,
  res: Response
) {
  try {
    const { id } = req.params;
    const { isAvailable } = req.body;

    if (typeof isAvailable !== "boolean") {
      return res.status(400).json({ message: "isAvailable must be boolean" });
    }

    const updated = await toggleVariantValueAvailability(id, isAvailable);
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update variant value" });
  }
}

/**
 * TOGGLE PRICE AVAILABILITY
 */
export async function updatePriceAvailability(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { isAvailable } = req.body;

    if (typeof isAvailable !== "boolean") {
      return res.status(400).json({ message: "isAvailable must be boolean" });
    }

    const updated = await togglePriceAvailability(id, isAvailable);
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update price" });
  }
}
