import { NextRequest } from "next/server";

import prisma from "@/utils/connect";
import methods from "@/classes";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const cat = searchParams.get("cat");

  try {
    const products = await prisma.product.findMany({
      where: {
        ...(cat ? { catSlug: cat } : { isFeatured: true }),
      },
    });

    if (!products) return methods.sendNotFound();

    const priceFormatted = products.map((product) => ({
      ...product,
      price: product.price.toFixed(2),
    }));

    return methods.sendSuccess(priceFormatted);
  } catch (error) {
    return methods.sendInternalServerError();
  }
}
