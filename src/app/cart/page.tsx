"use client";

import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { toast } from "react-toastify";

import { CartItemType } from "@/@types";
import { formatToMoney } from "@/utils/helpers";
import api from "@/utils/service";
import { useCartStore } from "@/utils/store";

interface Props {
  products: CartItemType[];
  price: number;
  userEmail: string | null | undefined;
}

async function makeCheckoutPost({ products, price, userEmail }: Props) {
  const headers = { "Content-Type": "application/json" };
  const body = {
    products,
    price,
    userEmail,
    status: "Not Paid",
  };

  try {
    const { data } = await api.post<{ id: string }>("/orders", body, {
      headers,
    });
    return data;
  } catch (error) {
    throw new Error("Got a error while try create checkout");
  }
}

export default function Page() {
  const { products, totalItems, totalPrice, removeFromCart } = useCartStore();
  const { data: session } = useSession();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: () =>
      makeCheckoutPost({
        products,
        price: totalPrice,
        userEmail: session?.user.email,
      }),
    onSuccess: ({ id }) => {
      toast("The product has been deleted!");
      router.push(`/auth/pay/${id}`);
    },
    onError: () => {
      toast.error("Error creating checkout ");
    },
  });

  const handleCheckout = () => {
    if (!session) router.push(`/login`);
    else mutation.mutate();
  };

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  return (
    <section className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-gray-500 lg:flex-row">
      <div className="h-1/2 p-4 flex flex-col justify-center overflow-auto lg:h-full lg:w-2/3 2xl:w-1/2 lg:px-20 xl:px-40">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between mb-4"
          >
            {product.img && (
              <Image
                src={product.img}
                alt={product.title}
                width={100}
                height={100}
              />
            )}

            <div>
              <h1 className="uppercase text-xl font-bold">
                {product.title} x{product.quantity}
              </h1>
              <span>{product.optionTitle}</span>
            </div>

            <h2 className="font-bold">{formatToMoney(product.price)}</h2>

            <span
              className="cursor-pointer"
              onClick={() => removeFromCart(product)}
            >
              X
            </span>
          </div>
        ))}
      </div>

      <div className="h-1/2 p-4 bg-fuchsia-50 flex flex-col gap-4 justify-center lg:h-full lg:w-1/3 2xl:w-1/2 lg:px-20 xl:px-40 2xl:text-xl 2xl:gap-6">
        <div className="flex justify-between">
          <span>Subtotal ({totalItems} items)</span>
          <span>{formatToMoney(totalPrice)}</span>
        </div>
        <div className="flex justify-between">
          <span>Service Cost</span>
          <span>$0.00</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery Cost</span>
          <span className="text-green-500">FREE!</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between">
          <span>TOTAL(INCL. VAT)</span>
          <span className="font-bold">{formatToMoney(totalPrice)}</span>
        </div>

        <button
          className="bg-blue-500 text-white p-3 rounded-md w-1/2 self-end"
          onClick={handleCheckout}
        >
          CHECKOUT
        </button>
      </div>
    </section>
  );
}
