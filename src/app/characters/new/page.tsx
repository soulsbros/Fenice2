import CharacterForm from "@/components/characterForm";
import { authOptions } from "@/lib/authConfig";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";

export const metadata: Metadata = {
  title: "New character",
};

export default async function NewCharacterPage() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <div className="title">New character</div>
      {session?.user.roles.includes("player") ? (
        <CharacterForm />
      ) : (
        <div>
          You are not allowed to create characters.{" "}
          <Link href="https://soulsbros.ch/?p=contact" className="link">
            Contact us
          </Link>{" "}
          if you think it&apos;s a mistake!
        </div>
      )}
    </>
  );
}
