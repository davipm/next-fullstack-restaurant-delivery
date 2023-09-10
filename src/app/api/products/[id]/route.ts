import prisma from "@/utils/connect";
import { NextRequest, NextResponse as res } from "next/server";
import { getCurrentUser } from "@/utils/auth";

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

    return res.json(product, { status: 200 });
  } catch (error) {
    return res.json(
      { message: "Something went wrong!", error },
      {
        status: 500,
      },
    );
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const { id } = params;
  const session = await getCurrentUser();

  try {
    if (session.user.isAdmin) {
      await prisma.product.delete({
        where: {
          id,
        },
      });

      return res.json(
        { message: "Product has been deleted!" },
        { status: 200 },
      );
    }

    return res.json({ message: "You are not allowed!" }, { status: 403 });
  } catch (error) {
    return res.json(
      { message: "Something went wrong!", error },
      {
        status: 500,
      },
    );
  }
}
