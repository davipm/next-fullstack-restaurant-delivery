import Link from "next/link";

import LogoutBtn from "@/components/LogoutBtn";
import { getCurrentUser } from "@/utils/auth";

export default async function UserLinks() {
  const session = await getCurrentUser();

  if (!session) return <Link href="/login">Login</Link>;

  return (
    <div>
      <Link href="/auth/orders">Orders</Link>
      <LogoutBtn />
    </div>
  );
}
