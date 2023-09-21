"use client";

import { useQuery } from "@tanstack/react-query";
import cx from "classnames";
import Skeleton from "react-loading-skeleton";

import { OrderType } from "@/@types";
import OrdersFormContainer from "@/components/OrdersFormContainer";
import { formatToMoney } from "@/utils/helpers";
import api from "@/utils/service";

export default function OrdersForm() {
  const { data, isLoading, isError } = useQuery({
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

  if (isLoading)
    return (
      <>
        {[...new Array(5)].map((_, index) => (
          <tr key={index}>
            <td className="hidden md:block py-2 px-1">
              <Skeleton height={70} />
            </td>
            <td>
              <Skeleton height={70} />
            </td>
            <td>
              <Skeleton height={70} />
            </td>
            <td>
              <Skeleton height={70} />
            </td>
            <td>
              <Skeleton height={70} />
            </td>
          </tr>
        ))}
      </>
    );

  if (isError) return <div>...Error</div>;

  return (
    <>
      {data.map((order) => (
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
          <OrdersFormContainer order={order} />
        </tr>
      ))}
    </>
  );
}
