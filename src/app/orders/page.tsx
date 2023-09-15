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
      return api.put(`/orders/${id}`, { body: status }, { headers });
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
                      className="bg-red-400 p-2 rounded-full"
                    >
                      <Image
                        src="/edit.png"
                        alt="Edit"
                        width={20}
                        height={20}
                      />
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
