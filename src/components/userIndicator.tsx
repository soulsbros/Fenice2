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
    <div className="flex items-center space-x-2">
      <Link
        href={session ? "/profile" : "/api/auth/signin"}
        className="flex items-center"
      >
        <span className="mr-2">
          {session ? session?.user?.name?.split(" ")[0] : "Login"}
        </span>
        <ImageWithFallback
          src={`https://gravatar.com/avatar/${hash}?s=200`}
          fallbackSrc={defaultImage}
          width={40}
          height={40}
          alt={`Profile picture of ${session?.user?.name}`}
        />
      </Link>
    </div>
  );
}
