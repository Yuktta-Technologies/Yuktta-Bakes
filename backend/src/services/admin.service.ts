import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";

/**
 * LOGIN
 */
export async function authenticateAdmin(email: string, password: string) {
  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin) return null;

  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) return null;

  const token = jwt.sign(
    { id: admin.id, email: admin.email },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  return { token, admin };
}

/**
 * TOGGLE PRODUCT
 */
export async function toggleProductAvailability(
  id: string,
  isAvailable: boolean
) {
  return prisma.product.update({
    where: { id },
    data: { isAvailable },
  });
}

/**
 * TOGGLE VARIANT VALUE
 */
export async function toggleVariantValueAvailability(
  id: string,
  isAvailable: boolean
) {
  return prisma.variantValue.update({
    where: { id },
    data: { isAvailable },
  });
}

/**
 * TOGGLE PRICE
 */
export async function togglePriceAvailability(
  id: string,
  isAvailable: boolean
) {
  return prisma.variantPrice.update({
    where: { id },
    data: { isAvailable },
  });
}
