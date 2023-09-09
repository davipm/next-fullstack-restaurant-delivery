import prisma from "@/utils/connect";
import { NextRequest, NextResponse as res } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const cat = searchParams.get("cat");

  try {
    const products = await prisma.product.findMany({
      where: {
        ...(cat ? { catSlug: cat } : { isFeatured: true }),
      },
    });

    const priceFormatted = products.map((product) => ({
      ...product,
      price: product.price.toFixed(2),
    }));

    return res.json(priceFormatted, { status: 200 });
  } catch (error) {
    return res.json(
      { message: "Something went wrong!", error },
      {
        status: 500,
      },
    );
  }
}
