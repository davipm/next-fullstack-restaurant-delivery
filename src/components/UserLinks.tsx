import Link from "next/link";
import { getCurrentUser } from "@/utils/auth";
import LogoutBtn from "@/components/LogoutBtn";

export default async function UserLinks() {
  const session = await getCurrentUser();

  return (
    <>
      {session ? (
        <div>
          <Link href="/orders">Orders</Link>
          <LogoutBtn />
        </div>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </>
  );
}
