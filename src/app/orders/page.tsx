"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import api from "@/utils/service";
import { OrderType } from "@/@types";
import LoadingSpinner from "@/components/Loading";
import { formatToMoney } from "@/utils/helpers";
import cx from "classnames";

export default function Orders() {
  const { data: session, status } = useSession();

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

  if (status === "unauthenticated") redirect("/");

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-4 lg:px-20 xl:px-40">
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
