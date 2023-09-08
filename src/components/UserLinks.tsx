"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function UserLinks() {
  const { status } = useSession();

  return (
    <div>
      {status === "authenticated" ? (
        <div>
          <Link href="/order">Order</Link>
          <span className="ml-4 cursor-pointer" onClick={() => signOut()}>
            Logout
          </span>
        </div>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </div>
  );
}
