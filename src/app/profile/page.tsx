import { LogoutButton } from "@/components/button";
import CharacterInfo from "@/components/characterInfo";
import defaultImage from "@/img/defaultUser.png";
import { authOptions } from "@/lib/authConfig";
import { Character } from "@/types/API";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { getCharacters } from "../actions";

export default async function Profile() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const issuer = process.env.KEYCLOAK_ISSUER ?? "";

  const result = await getCharacters(
    {
      field: "campaignId",
      direction: "DESC",
    },
    {
      playerEmail: session?.user.email,
    }
  );

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
        <Link
          href={`${issuer}/account`}
          target="_blank"
          className="primary button"
        >
          Manage account
        </Link>
        <LogoutButton />
      </div>

      <p className="title mt-8">Your characters</p>

      {result.success
        ? result?.data.map((character: Character) => (
            <CharacterInfo
              character={character}
              key={character._id?.toString()}
            />
          ))
        : result.message}

      <Link href={`/characters/new`} className="primary button mt-4">
        Create
      </Link>
    </>
  );
}
