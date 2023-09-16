import prisma from "@/utils/connect";
import { NextRequest } from "next/server";

import methods from "@/classes";

interface PutParams {
  params: {
    id: string;
  };
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
