import { Router } from "express";
import passport from "../auth/passport";

import {
  adminLogin,
  updateProductAvailability,
  updateVariantValueAvailability,
  updatePriceAvailability,
} from "../controllers/admin.controller";

import {
  createOfferController,
  updateOfferController,
  toggleOfferController,
  getOffersController,
  deleteOfferController,
} from "../controllers/offer.controller";

const router = Router();

/**
 * =========================
 * PUBLIC ROUTE
 * =========================
 */
router.post("/login", adminLogin);

/**
 * =========================
 * PROTECTED ROUTES (JWT REQUIRED)
 * =========================
 */

const protect = passport.authenticate("jwt", { session: false });

/**
 * PRODUCT AVAILABILITY
 */
router.patch("/products/:id", protect, updateProductAvailability);

router.patch(
  "/variant-values/:id",
  protect,
  updateVariantValueAvailability
);

router.patch("/prices/:id", protect, updatePriceAvailability);

/**
 * =========================
 * OFFER MANAGEMENT
 * =========================
 */

/**
 * Create Offer
 */
router.post("/offers", protect, createOfferController);

/**
 * Get All Offers
 */
router.get("/offers", protect, getOffersController);

/**
 * Update Offer (value, dates, etc.)
 */
router.patch("/offers/:id", protect, updateOfferController);

/**
 * Toggle Offer Active/Inactive
 */
router.patch("/offers/:id/toggle", protect, toggleOfferController);

/**
 * Delete Offer
 */
router.delete("/offers/:id", protect, deleteOfferController);

export default router;
