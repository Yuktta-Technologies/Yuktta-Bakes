import { Request, Response } from "express";
import {
  createOffer,
  updateOffer,
  toggleOffer,
  getAllOffers,
  deleteOffer,
} from "../services/offer.service";

/**
 * CREATE OFFER
 */
export async function createOfferController(req: Request, res: Response) {
  try {
    const {
      name,
      description,
      type,
      value,
      appliesTo,
      productId,
      category,
      startDate,
      endDate,
    } = req.body;

    if (!name || !type || !value || !appliesTo || !startDate || !endDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const offer = await createOffer({
      name,
      description,
      type,
      value,
      appliesTo,
      productId,
      category,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    });

    res.status(201).json(offer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create offer" });
  }
}

/**
 * UPDATE OFFER
 */
export async function updateOfferController(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const offer = await updateOffer(id, req.body);
    res.json(offer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update offer" });
  }
}

/**
 * TOGGLE OFFER
 */
export async function toggleOfferController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    if (typeof isActive !== "boolean") {
      return res.status(400).json({ message: "isActive must be boolean" });
    }

    const offer = await toggleOffer(id, isActive);
    res.json(offer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to toggle offer" });
  }
}

/**
 * GET ALL OFFERS
 */
export async function getOffersController(_req: Request, res: Response) {
  try {
    const offers = await getAllOffers();
    res.json(offers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch offers" });
  }
}

/**
 * DELETE OFFER
 */
export async function deleteOfferController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await deleteOffer(id);
    res.json({ message: "Offer deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete offer" });
  }
}
