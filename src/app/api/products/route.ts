import { NextRequest } from "next/server";

import prisma from "@/utils/connect";
import methods from "@/classes";

export async function GET(req: NextRequest) {
  const cat = req.nextUrl.searchParams.get("cat");

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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const product = await prisma.product.create({
      data: body,
    });

    return methods.sendSuccess(product, 201);
  } catch (error) {
    return methods.sendInternalServerError();
  }
}
