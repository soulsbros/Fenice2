import defaultImage from "@/img/defaultUser.png";
import { authOptions } from "@/lib/authConfig";
import { createHash } from "crypto";
import { getServerSession } from "next-auth";
import Link from "next/link";
import ImageWithFallback from "./imageWithFallback";

export default async function UserIndicator() {
  const session = await getServerSession(authOptions);
  // https://docs.gravatar.com/general/hash
  const hash = createHash("sha256")
    .update(session?.user.email?.trim().toLowerCase() ?? "")
    .digest("hex");

  return (
    <Link
      href={session ? "/profile" : "/api/auth/signin"}
      className="flex items-center"
    >
      <span>{session ? session?.user?.firstName : "Login"}</span>
      <ImageWithFallback
        src={`https://gravatar.com/avatar/${hash}?s=200&d=mp`}
        fallbackSrc={defaultImage}
        width={40}
        height={40}
        alt={`Profile picture of ${session?.user?.firstName}`}
        className="mx-2"
      />
    </Link>
  );
}
