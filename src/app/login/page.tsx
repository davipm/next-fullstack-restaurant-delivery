"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();

  if (status === "loading") return <p>Loading...</p>;

  if (status === "authenticated") return router.push("/");

  return (
    <div className="p-4 h-[clac(100vh-6rem)] md:h-[calc(100vh-9rem)] flex items-center justify-center">
      <div className="h-full shadow-2xl rounded-md flex flex-col md:flex-row md:h-[70%] md:w-full lg:w-[60%] 2xl:w-1/2">
        <div className="relative h-1/3 w-full md:h-full md:w-1/2">
          <Image
            src="/loginBg.png"
            alt="loginBg"
            quality={60}
            priority={true}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
