import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { SyntheticEvent, useEffect, useState } from "react";

import AddressForm from "@/components/AddressForm";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) return;
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret",
    );

    if (!clientSecret) return;

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage('Your payment was not successful, please try again."');
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  async function onSubmit(event: SyntheticEvent) {
    event.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/auth/success",
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message || "Something went wrong!");
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  }

  return (
    <form
      onSubmit={onSubmit}
      id="payment-form"
      className="min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-15rem)] p-4 lg:px-20 xl:px-40 flex flex-col gap-8"
    >
      <LinkAuthenticationElement id="link-authentication-element" />
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      <AddressForm />
      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="bg-blue-500 text-white p-4 rounded-md w-28"
      >
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner" /> : "Pay Now"}
        </span>
      </button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
