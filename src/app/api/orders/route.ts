import { NextRequest, NextResponse as res } from "next/server";

import { getCurrentUser } from "@/utils/auth";
import prisma from "@/utils/connect";

export async function GET() {
  const session = await getCurrentUser();

  if (session) {
    try {
      const orders = await prisma.order.findMany({
        where: {
          userEmail: session.user.email!,
        },
      });

      if (session.user.isAdmin) {
        const orders = await prisma.order.findMany();
        return res.json(orders, { status: 200 });
      }

      return res.json(orders, { status: 200 });
    } catch (error) {
      return res.json(
        { message: "Something went wrong!" },
        {
          status: 500,
        },
      );
    }
  } else {
    return res.json(
      { message: "You are not authenticated!", status: 401 },
      {
        status: 401,
      },
    );
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

      return res.json(order, { status: 201 });
    } catch (error) {
      return res.json(
        { message: "Something went wrong!" },
        {
          status: 500,
        },
      );
    }
  } else {
    return res.json(
      { message: "You are not authenticated!" },
      {
        status: 401,
      },
    );
  }
}
