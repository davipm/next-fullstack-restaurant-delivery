"use client";

import { signOut } from "next-auth/react";

export default function LogoutBtn() {
  return (
    <span className="ml-4 cursor-pointer" onClick={() => signOut()}>
      Logout
    </span>
  );
}
