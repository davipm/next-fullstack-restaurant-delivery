"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function LoginForm() {
  return (
    <>
      <button
        className="flex items-center gap-4 p-4 ring-1 ring-orange-100 rounded-md"
        onClick={() => signIn("google")}
      >
        <Image
          src="/google.png"
          alt="Google"
          width={20}
          height={20}
          className="object-contain"
        />
        <span>Sign in with Google</span>
      </button>
      <button
        className="flex items-center gap-4 p-4 ring-1 ring-orange-100 rounded-md"
        onClick={() => signIn("google")}
      >
        <Image
          src="/facebook.png"
          alt="Google"
          width={20}
          height={20}
          className="object-contain"
        />
        <span>Sign in with Facebook</span>
      </button>
      <p className="text-sm">
        Have a problem?
        <Link href="/contact" className="underline">
          {" "}
          Contact us
        </Link>
      </p>
    </>
  );
}
