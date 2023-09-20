import { NextRequest } from "next/server";

import methods from "@/classes";
import prisma from "@/utils/connect";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

interface Params {
  params: { orderId: string };
}
export async function POST(req: NextRequest, { params }: Params) {
  const { orderId } = params;

  try {
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (order) {
      const paymentIntent = await stripe.paymentIntents.create({
        // @ts-ignore
        amount: order.price * 100,
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
      });

      await prisma.order.update({
        where: {
          id: orderId,
        },
        data: { intent_id: paymentIntent.client_secret },
      });

      methods.sendSuccess({ clientSecret: paymentIntent.client_secret });
    }
  } catch (error) {
    return methods.sendInternalServerError();
  }
}
