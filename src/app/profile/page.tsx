import { LogoutButton } from "@/components/button";
import defaultImage from "@/img/defaultUser.png";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Profile() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const issuer = process.env.KEYCLOAK_ISSUER ?? "";

  return (
    <>
      <p className="title">Your profile</p>

      <div className="flex items-center gap-8">
        <Image
          src={user?.image ? user?.image : defaultImage}
          width={100}
          height={100}
          alt={`Profile picture of ${user?.name}`}
        />

        <div>
          Name: {user?.name}
          <br />
          Email: {user?.email}
          <br />
          Roles: {user?.roles.join(", ")}
        </div>
      </div>

      <div className="mt-4 space-x-2">
        <Link href={`${issuer}/account`} target="_blank" className="button">
          Manage account
        </Link>
        <LogoutButton />
      </div>

      <p className="title mt-8">Your characters</p>

      <div className="mt-4">Coming soon</div>

      <Link href={`/characters/new`} className="button mt-4">
        Create
      </Link>
    </>
  );
}
