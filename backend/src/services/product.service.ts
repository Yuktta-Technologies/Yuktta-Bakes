import { prisma } from "../lib/prisma";
import { filterValidPrices } from "../utils/priceFilter";

export async function fetchAllProducts() {
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

        prices: validPrices.map((price) => ({
          id: price.id,
          combination: price.combination,
          price: price.price,
        })),
      };
    })
    .filter((p) => p.prices.length > 0);
}

export async function fetchProductBySlug(slug: string) {
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

    prices: validPrices.map((price) => ({
      id: price.id,
      combination: price.combination,
      price: price.price,
    })),
  };
}
