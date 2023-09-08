import { prisma } from "@/utils/connect";
import { NextResponse as res } from "next/server";

export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    return res.json(categories, { status: 200 });
  } catch (error) {
    return res.json({ message: "Something went wrong!" }, { status: 500 });
  }
}
