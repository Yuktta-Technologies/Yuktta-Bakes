import { prisma } from "../lib/prisma";
import { filterValidPrices } from "../utils/priceFilter";

/**
 * Apply Highest Discount Wins rule
 */
function applyBestOffer(
  basePrice: number,
  product: any,
  offers: any[]
) {
  let bestDiscount = 0;
  let bestOffer = null;

  for (const offer of offers) {
    let applies = false;

    if (offer.appliesTo === "ALL") {
      applies = true;
    }

    if (
      offer.appliesTo === "CATEGORY" &&
      offer.category === product.category
    ) {
      applies = true;
    }

    if (
      offer.appliesTo === "PRODUCT" &&
      offer.productId === product.id
    ) {
      applies = true;
    }

    if (!applies) continue;

    let discountAmount = 0;

    if (offer.type === "PERCENTAGE") {
      discountAmount = (basePrice * offer.value) / 100;
    }

    if (offer.type === "FLAT") {
      discountAmount = offer.value;
    }

    if (discountAmount > bestDiscount) {
      bestDiscount = discountAmount;
      bestOffer = offer;
    }
  }

  const finalPrice = Math.max(basePrice - bestDiscount, 0);

  return {
    finalPrice,
    discountAmount: bestDiscount,
    appliedOffer: bestOffer
      ? {
          id: bestOffer.id,
          name: bestOffer.name,
          type: bestOffer.type,
          value: bestOffer.value,
        }
      : null,
  };
}

export async function fetchAllProducts() {
  const now = new Date();

  const activeOffers = await prisma.offer.findMany({
    where: {
      isActive: true,
      startDate: { lte: now },
      endDate: { gte: now },
    },
  });

  const products = await prisma.product.findMany({
    where: {
      isAvailable: true,
      prices: {
        some: { isAvailable: true },
      },
    },
    include: {
      tags: { include: { tag: true } },
      options: {
        include: {
          values: { where: { isAvailable: true } },
        },
      },
      prices: { where: { isAvailable: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return products
    .map((p) => {
      const validPrices = filterValidPrices(p.prices, p.options);

      return {
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
          values: opt.values.map((v) => ({
            code: v.code,
            label: v.label,
          })),
        })),

        prices: validPrices.map((price) => {
          const offerResult = applyBestOffer(
            price.price,
            p,
            activeOffers
          );

          return {
            id: price.id,
            combination: price.combination,
            price: price.price,
            finalPrice: offerResult.finalPrice,
            discountAmount: offerResult.discountAmount,
            appliedOffer: offerResult.appliedOffer,
          };
        }),
      };
    })
    .filter((p) => p.prices.length > 0);
}

export async function fetchProductBySlug(slug: string) {
  const now = new Date();

  const activeOffers = await prisma.offer.findMany({
    where: {
      isActive: true,
      startDate: { lte: now },
      endDate: { gte: now },
    },
  });

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      tags: { include: { tag: true } },
      options: {
        include: {
          values: { where: { isAvailable: true } },
        },
      },
      prices: { where: { isAvailable: true } },
    },
  });

  if (!product || !product.isAvailable) {
    return null;
  }

  const validPrices = filterValidPrices(product.prices, product.options);

  if (validPrices.length === 0) {
    return null;
  }

  return {
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

    prices: validPrices.map((price) => {
      const offerResult = applyBestOffer(
        price.price,
        product,
        activeOffers
      );

      return {
        id: price.id,
        combination: price.combination,
        price: price.price,
        finalPrice: offerResult.finalPrice,
        discountAmount: offerResult.discountAmount,
        appliedOffer: offerResult.appliedOffer,
      };
    }),
  };
}
