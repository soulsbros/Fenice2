import defaultUser from "@/img/defaultUser.png";
import { getWithFilter } from "@/lib/mongo";
import { Character } from "@/types/API";
import Link from "next/link";
import { ReactElement } from "react";
import ImageWithFallback from "./imageWithFallback";

interface CharacterInfoProps {
  character: Character;
}

function CharacterAttribute(key: string, value: string | ReactElement) {
  return (
    <div className="flex mb-2">
      <div className="font-extrabold flex-1">{key}</div>
      <div className="flex-[2]">{value || `Unknown ${key}`}</div>
    </div>
  );
}

export default async function CharacterInfo({
  character,
}: Readonly<CharacterInfoProps>) {
  const campaignInfo = await getWithFilter("campaigns", undefined, {
    _id: character.campaignId,
  });
  const campaign = campaignInfo?.data[0];

  return (
    <div className="mb-5 p-5 border rounded-md shadow-md">
      <div className="text-center">
        <ImageWithFallback
          // TODO remove this check once legacy image API is not needed anymore
          src={
            character.characterId
              ? `https://lafenice.soulsbros.ch/img/pg/${character.characterId}.jpg`
              : character.image
          }
          fallbackSrc={defaultUser}
          alt="Character image"
          width={300}
          height={300}
          className="rounded inline-block"
        />
      </div>

      <div className="mt-4">
        {CharacterAttribute(
          "Player",
          <Link
            href={`/characters/by-user/${character.playerEmail}`}
            className="hover:underline"
          >
            {character.player}
          </Link>
        )}
        {CharacterAttribute(
          "Campaign",
          <Link
            href={`/characters/by-campaign/${campaign._id}`}
            className="hover:underline"
          >
            {campaign.name}
          </Link>
        )}
        {CharacterAttribute("Class", character.class)}
        {CharacterAttribute("Race", character.race)}
        {CharacterAttribute("Alignment", character.actualAlignment)}
        {CharacterAttribute("Personality", character.personality || "-")}
        {CharacterAttribute("Backstory", character.backstory || "-")}
      </div>
    </div>
  );
}
