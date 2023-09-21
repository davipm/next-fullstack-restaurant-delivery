import { NextRequest } from "next/server";

import methods from "@/classes";
import prisma from "@/utils/connect";

interface Params {
  params: { intentId: string };
}

export const PUT = async (req: NextRequest, { params }: Params) => {
  const { intentId } = params;

  try {
    const order = await prisma.order.update({
      where: {
        intent_id: intentId,
      },
      data: { status: "Being prepared!" },
    });

    if (!order) {
      return methods.sendNotFound();
    }

    return methods.sendSuccess({ message: "Order has been updated" });
  } catch (err) {
    return methods.sendInternalServerError();
  }
};
