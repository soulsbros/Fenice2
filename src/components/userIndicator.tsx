import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { User } from "react-feather";

export default async function UserIndicator() {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex items-center">
      <div>
        {session ? (
          <Link href="/profile">{session?.user?.name?.split(" ")[0]}</Link>
        ) : (
          <Link href="/api/auth/signin">Login</Link>
        )}
      </div>
      <User className="ml-2" />
    </div>
  );
}
