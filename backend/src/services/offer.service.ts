import { prisma } from "../lib/prisma";

export async function createOffer(data: any) {
  return prisma.offer.create({ data });
}

export async function updateOffer(id: string, data: any) {
  return prisma.offer.update({
    where: { id },
    data,
  });
}

export async function toggleOffer(id: string, isActive: boolean) {
  return prisma.offer.update({
    where: { id },
    data: { isActive },
  });
}

export async function getAllOffers() {
  return prisma.offer.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function deleteOffer(id: string) {
  return prisma.offer.delete({
    where: { id },
  });
}
