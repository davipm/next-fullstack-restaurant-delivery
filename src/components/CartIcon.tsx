import Link from "next/link";
import Image from "next/image";
import { getCurrentUser } from "@/utils/auth";
import CartBtn from "@/components/CartBtn";

export default async function CartIcon() {
  const session = await getCurrentUser();

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
        <Link
          href="/auth/add"
          className="p-1 bg-blue-500 text-white rounded-md"
        >
          Add product
        </Link>
      )}

      <CartBtn />
    </div>
  );
}
