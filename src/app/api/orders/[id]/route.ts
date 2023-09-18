import prisma from "@/utils/connect";
import { NextRequest } from "next/server";

import methods from "@/classes";
import { getCurrentUser } from "@/utils/auth";

interface PutParams {
  params: {
    id: string;
  };
}

export async function DELETE(req: NextRequest, { params }: PutParams) {
  const { id } = params;
  const session = await getCurrentUser();

  try {
    if (session.user.isAdmin) {
      const order = await prisma.order.delete({
        where: {
          id,
        },
      });

      if (!order) return methods.sendNotFound("No Order found with this ID");

      return methods.sendSuccess({ message: "Order deleted!" });
    }

    return methods.sendError(403, "You are not allowed!");
  } catch (error) {
    return methods.sendInternalServerError();
  }
}

export async function PUT(req: NextRequest, { params }: PutParams) {
  const { id } = params;

  try {
    const body = await req.json();

    await prisma.order.update({
      where: {
        id,
      },
      data: { status: body },
    });

    return methods.sendSuccess({ message: "Order has been updated!" });
  } catch (error) {
    return methods.sendInternalServerError();
  }
}
