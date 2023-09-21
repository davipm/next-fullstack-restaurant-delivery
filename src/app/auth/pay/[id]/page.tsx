"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import CheckoutForm from "@/components/CheckoutForm";
import api from "@/utils/service";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

interface PayPageParams {
  params: {
    id: string;
  };
}

export default function PayPage({ params }: PayPageParams) {
  const { id } = params;
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.post<{ clientSecret: string }>(
          `/create-intent/${id}`,
        );
        setClientSecret(data.clientSecret);
      } catch (error) {
        toast.error("Error trying to create create-intent!");
      }
    })();
  }, [id]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: { theme: "stripe" },
  };

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
