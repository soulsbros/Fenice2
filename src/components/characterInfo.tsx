import defaultUser from "@/img/defaultUser.png";
import { getActualAlignment } from "@/lib/alignment";
import { encrypt, getWithFilter } from "@/lib/mongo";
import { Campaign, Character } from "@/types/API";
import Link from "next/link";
import { ReactElement } from "react";
import ImageWithFallback from "./imageWithFallback";

interface CharacterInfoProps {
  character: Character;
}

function CharacterAttribute(key: string, value: string | ReactElement) {
  return (
    <div className="flex mb-4">
      <div className="font-extrabold flex-1">{key}</div>
      <div className="flex-[2] m-auto">{value || "Unknown"}</div>
    </div>
  );
}

export default async function CharacterInfo({
  character,
}: Readonly<CharacterInfoProps>) {
  const campaignInfo = await getWithFilter("campaigns", undefined, {
    _id: character.campaignId,
  });
  const campaign = campaignInfo?.data[0] as Campaign;

  return (
    <div className="mb-5 p-5 border rounded-md shadow-md">
      <div className="text-center">
        {character.images.length === 0 ? "No character image(s)" : null}
        {character.images.map((image) => (
          <ImageWithFallback
            src={image}
            fallbackSrc={defaultUser}
            alt={`Image for ${character.name}`}
            width={300}
            height={300}
            className="rounded inline-block m-2"
            key={image.substring(25)}
          />
        ))}
      </div>

      <div className="mt-4">
        {CharacterAttribute(
          "Player",
          <Link
            href={`/characters/by-user/${encrypt(character.playerEmail)}`}
            className="link"
          >
            {character.player}
          </Link>
        )}
        {CharacterAttribute(
          "Campaign",
          <Link
            href={`/characters/by-campaign/${campaign._id}`}
            className="link"
          >
            {campaign.name}
          </Link>
        )}
        {CharacterAttribute("Class", character.class)}
        {CharacterAttribute("Race", character.race)}
        {CharacterAttribute("Alignment", getActualAlignment(character))}
        {CharacterAttribute(
          "Gender and pronouns",
          `${character.gender}${character.gender && character.pronouns ? ", " : ""}${character.pronouns}`
        )}
        {CharacterAttribute("Sexual orientation", character.orientation)}
        {CharacterAttribute("Personality", character.personality)}
        {CharacterAttribute("Backstory", character.backstory)}
      </div>
    </div>
  );
}
