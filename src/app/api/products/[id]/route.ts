import { NextRequest } from "next/server";

import methods from "@/classes";
import { getCurrentUser } from "@/utils/auth";
import prisma from "@/utils/connect";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(req: NextRequest, { params }: Params) {
  const { id } = params;

  try {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      return methods.sendNotFound("No Products with this ID");
    }

    return methods.sendSuccess(product);
  } catch (error) {
    return methods.sendInternalServerError();
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const { id } = params;
  const session = await getCurrentUser();

  try {
    if (session.user.isAdmin) {
      const product = await prisma.product.delete({
        where: {
          id,
        },
      });

      if (!product) {
        return methods.sendNotFound("No Products found with this ID");
      }

      return methods.sendSuccess({ message: "Product deleted!" });
    }

    return methods.sendError(403, "You are not allowed!");
  } catch (error) {
    return methods.sendInternalServerError();
  }
}
