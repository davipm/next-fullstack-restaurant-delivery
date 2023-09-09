import Link from "next/link";
import { getCurrentUser } from "@/utils/auth";
import LogoutBtn from "@/components/LogoutBtn";

export default async function UserLinks() {
  const session = await getCurrentUser();

  return (
    <>
      {session ? (
        <div>
          <Link href="/order">Order</Link>
          <LogoutBtn />
        </div>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </>
  );
}
