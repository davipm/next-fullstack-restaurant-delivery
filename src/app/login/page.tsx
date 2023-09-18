import Image from "next/image";
import { redirect } from "next/navigation";

import LoginForm from "@/components/LoginForm";
import { getCurrentUser } from "@/utils/auth";

export default async function LoginPage() {
  const session = await getCurrentUser();

  if (session) return redirect("/");

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

        <div className="p-10 flex flex-col gap-8 md:w-1/2">
          <h1 className="font-bold text-xl xl:text-3xl">Welcome</h1>
          <p>Log into your account or create a new one using social buttons</p>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
