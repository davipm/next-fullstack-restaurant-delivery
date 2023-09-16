"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/utils/service";
import { OrderType } from "@/@types";
import LoadingSpinner from "@/components/Loading";
import { formatToMoney } from "@/utils/helpers";
import cx from "classnames";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

export default function Orders() {
  const queryClient = useQueryClient();

  const { data: session, status } = useSession();

  const [orderStatus, setOrderStatus] = useState("");

  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      try {
        const { data } = await api.get<OrderType[]>("/orders");
        return data;
      } catch (error) {
        throw new Error("Error trying get orders");
      }
    },
  });

  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => {
      const headers = { "Content-Type": "application/json" };
      return api.put(`/orders/${id}`, status, { headers });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("The order status has been changed!");
    },
    onError: () => {
      toast.error("Error trying to update Order!");
    },
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>, id: string) {
    e.preventDefault();
    mutation.mutate({ id, status: orderStatus });
  }

  if (status === "unauthenticated") redirect("/");

  if (isLoading) return <LoadingSpinner />;

  return (
    <section className="min-h-[calc(70vh)] p-4 lg:px-20 xl:px-40">
      <table className="w-full border-separate border-spacing-3">
        <thead>
          <tr className="text-left">
            <th className="hidden md:block">Order ID</th>
            <th>Date</th>
            <th>Price</th>
            <th className="hidden md:block">Products</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order) => (
            <tr
              key={order.id}
              className={cx(order.status !== "delivered" && "bg-red-50")}
            >
              <td className="hidden md:block py-6 px-1">{order.id}</td>
              <td className="py-6 px-1">
                {order.createdAt.toString().slice(0, 10)}
              </td>
              <td className="py-6 px-1">{formatToMoney(order.price)}</td>
              <td className="hidden md:block py-6 px-1">
                {order.products[0].title}
              </td>
              {session?.user.isAdmin ? (
                <td>
                  <form
                    className="flex items-center justify-center gap-4"
                    onSubmit={(event) => handleSubmit(event, order.id)}
                  >
                    <input
                      type="text"
                      className="p-2 ring-1 ring-blue-100 rounded-md"
                      placeholder={order.status}
                      value={orderStatus}
                      onChange={(event) => setOrderStatus(event.target.value)}
                    />

                    <button
                      type="submit"
                      className="bg-red-400 p-2 rounded-full w-9 h-9"
                    >
                      {mutation.isLoading ? (
                        <svg
                          aria-hidden="true"
                          role="status"
                          className="inline w-4 h-4 text-white animate-spin relative bottom-[2px]"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="#E5E7EB"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentColor"
                          />
                        </svg>
                      ) : (
                        <Image
                          src="/edit.png"
                          alt="Edit"
                          width={20}
                          height={20}
                        />
                      )}
                    </button>
                  </form>
                </td>
              ) : (
                <td className="py-6 px-1">{order.status}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
