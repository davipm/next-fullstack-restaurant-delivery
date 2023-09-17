"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCartStore } from "@/utils/store";

export default function CartBtn() {
  const { totalItems } = useCartStore();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  return <Link href="/cart">Cart ({totalItems})</Link>;
}
