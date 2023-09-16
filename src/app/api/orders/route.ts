import { NextRequest } from "next/server";

import { getCurrentUser } from "@/utils/auth";
import prisma from "@/utils/connect";
import methods from "@/classes";

export async function GET() {
  const session = await getCurrentUser();

  if (session) {
    try {
      if (session.user.isAdmin) {
        const orders = await prisma.order.findMany();
        return methods.sendSuccess(orders);
      }

      const orders = await prisma.order.findMany({
        where: {
          userEmail: session.user.email!,
        },
      });

      return methods.sendSuccess(orders);
    } catch (error) {
      return methods.sendInternalServerError();
    }
  } else {
    return methods.sendError(401, "You are not authenticated!");
  }
}

export async function POST(req: NextRequest) {
  const session = await getCurrentUser();

  if (session) {
    try {
      const body = await req.json();

      const order = await prisma.order.create({
        data: body,
      });

      return methods.sendSuccess(order, 201);
    } catch (error) {
      return methods.sendInternalServerError();
    }
  } else {
    return methods.sendError(401, "You are not authenticated!");
  }
}
