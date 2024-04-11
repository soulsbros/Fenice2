import { getCharacters } from "@/actions/characters";
import { LogoutButton } from "@/components/button";
import CharacterCard from "@/components/characterCard";
import ImageWithFallback from "@/components/imageWithFallback";
import defaultImage from "@/img/defaultUser.png";
import { authOptions } from "@/lib/authConfig";
import { Character } from "@/types/API";
import { createHash } from "crypto";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Plus } from "react-feather";

export default async function ProfilePage() {
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

  // https://docs.gravatar.com/general/hash
  const hash = createHash("sha256")
    .update(session?.user.email?.trim().toLowerCase() ?? "")
    .digest("hex");

  return (
    <>
      <p className="title">Your profile</p>

      <div className="flex items-center gap-8">
        <ImageWithFallback
          src={`https://gravatar.com/avatar/${hash}?s=200`}
          fallbackSrc={defaultImage}
          width={100}
          height={100}
          alt={`Profile picture of ${user?.firstName}`}
        />

        <div>
          Name: {user?.firstName + " " + user?.lastName}
          <br />
          Nickname: {user?.nickname || "-"}
          <br />
          Email: {user?.email}
          <br />
          Roles: {user?.roles.join(", ")}
        </div>
      </div>

      <div className="my-4">
        <Link
          href={"https://gravatar.com/profile/avatars"}
          target="_blank"
          className="primary button"
        >
          Change picture
        </Link>
        <Link
          href={`${issuer}/account`}
          target="_blank"
          className="primary button"
        >
          Manage account
        </Link>
        <LogoutButton />
      </div>

      <div className="flex justify-between items-center">
        <span className="title">Your characters</span>
        <Link href={`/characters/new`} className="primary button mb-4">
          <Plus />
        </Link>
      </div>

      <div className="flex flex-wrap justify-around m-5">
        {result.success
          ? result?.data.map((character: Character) => (
              <CharacterCard
                character={character}
                showPlayer={false}
                key={character._id?.toString()}
              />
            ))
          : result.message}
      </div>
    </>
  );
}
