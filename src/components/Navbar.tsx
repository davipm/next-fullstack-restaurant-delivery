import Image from "next/image";
import Link from "next/link";

import CartIcon from "@/components/CartIcon";
import Menu from "@/components/Menu";
import UserLinks from "@/components/UserLinks";

export default function Navbar() {
  return (
    <nav className="h-12 text-gray-500 p-4 flex items-center justify-between border-b-2 border-b-blue-500 uppercase md:h-24 lg:px-20 xl:px-40">
      <div className="hidden md:flex gap-4 flex-1">
        <Link href="/">Homepage</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/contact">Contact</Link>
      </div>

      <div className="text-xl md:font-bold flex-1 md:text-center">
        <Link href="/">Massimo</Link>
      </div>

      <div className="md:hidden">
        <Menu />
      </div>

      <div className="hidden md:flex gap-4 items-center justify-end">
        <div className="md:absolute top-3 r-2 lg:static flex items-center gap-2 cursor-pointer bg-orange-300 px-1 rounded-md">
          <Image src="/phone.png" alt="" width={20} height={20} />
          <span>123 456 78</span>
        </div>

        <UserLinks />
        <CartIcon />
      </div>
    </nav>
  );
}
