"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function CartIcon() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center gap-4">
      <div className="relative w-8 h-8 md:w-5 md:h-5">
        <Image
          src="/cart.png"
          alt=""
          fill
          sizes="100%"
          className="object-contain"
        />
      </div>

      {session?.user.isAdmin && (
        <Link href="/add" className="p-1 bg-red-500 text-white rounded-md">
          Add product
        </Link>
      )}

      <Link href="/cart">Cart ({0})</Link>
    </div>
  );
}
