import Button, { LogoutButton } from "@/components/button";
import { getServerSession } from "next-auth";
import Image from "next/image";
import defaultImage from "../../img/default.png";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Profile() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const issuer = process.env.KEYCLOAK_ISSUER ?? "";

  return (
    <>
      <p className="font-semibold text-xl mb-4">Profile Page</p>

      {!user ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="flex items-center gap-8">
            <Image
              src={user.image ? user.image : defaultImage}
              width={100}
              height={100}
              alt={`Profile picture of ${user.name}`}
            />

            <div>
              Name: {user.name}
              <br />
              Email: {user.email}
            </div>
          </div>

          <div className="mt-4 space-x-2">
            <Button href={`${issuer}/account`} label="Manage account" />
            <LogoutButton />
          </div>
        </>
      )}
    </>
  );
}
