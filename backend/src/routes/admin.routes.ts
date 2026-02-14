import { Router } from "express";
import passport from "../auth/passport";
import {
  adminLogin,
  updateProductAvailability,
  updateVariantValueAvailability,
  updatePriceAvailability,
} from "../controllers/admin.controller";

const router = Router();

/**
 * PUBLIC ROUTE
 */
router.post("/login", adminLogin);

/**
 * PROTECTED ROUTES (JWT REQUIRED)
 */
router.patch(
  "/products/:id",
  passport.authenticate("jwt", { session: false }),
  updateProductAvailability
);

router.patch(
  "/variant-values/:id",
  passport.authenticate("jwt", { session: false }),
  updateVariantValueAvailability
);

router.patch(
  "/prices/:id",
  passport.authenticate("jwt", { session: false }),
  updatePriceAvailability
);

export default router;
