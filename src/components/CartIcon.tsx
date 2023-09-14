"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

import { useCartStore } from "@/utils/store";

export default function CartIcon() {
  const { totalItems } = useCartStore();
  const { data: session } = useSession();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  return (
    <div className="flex items-center gap-4">
      <div className="relative w-8 h-8 md:w-5 md:h-5">
        <Image
          src="/cart.png"
          alt="cart"
          fill
          sizes="100%"
          className="object-contain"
        />
      </div>

      {session?.user.isAdmin && (
        <Link href="/add" className="p-1 bg-blue-500 text-white rounded-md">
          Add product
        </Link>
      )}

      <Link href="/cart">Cart ({totalItems})</Link>
    </div>
  );
}
