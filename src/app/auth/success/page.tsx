"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { toast } from "react-toastify";

import api from "@/utils/service";

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const payment_intent = searchParams.get("payment_intent_client_secret");

  useEffect(() => {
    (async () => {
      try {
        await api.put(`/confirm/${payment_intent}`);
        setTimeout(() => {
          router.push("/auth/orders");
        }, 5000);
      } catch (error) {
        toast.error("Error trying to confirm!");
      }
    })();
  }, [payment_intent, router]);

  return (
    <div className="min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-15rem)] flex items-center justify-center text-center text-2xl text-green-700">
      <p className="max-w-[600px]">
        Payment successful. You are being redirected to the orders page. Please
        do not close the page.
      </p>
      <ConfettiExplosion className="absolute m-auto" />
    </div>
  );
}
