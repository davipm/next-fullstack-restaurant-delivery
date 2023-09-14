import prisma from "@/utils/connect";
import methods from "@/classes";

export async function GET() {
  try {
    const categories = await prisma.category.findMany();

    if (!categories) return methods.sendNotFound("No categories found!");

    return methods.sendSuccess(categories);
  } catch (error) {
    return methods.sendInternalServerError();
  }
}
