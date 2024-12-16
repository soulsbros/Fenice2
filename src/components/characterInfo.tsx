import defaultUser from "@/img/defaultUser.png";
import { getActualAlignment } from "@/lib/alignment";
import { encrypt, getWithFilter } from "@/lib/mongo";
import { Campaign, Character } from "@/types/API";
import Link from "next/link";
import { ReactElement } from "react";
import ImageWithFallback from "./imageWithFallback";

interface Props {
  character: Character;
}

function CharacterAttribute(key: string, value: string | ReactElement) {
  return (
    <div className="flex mb-4">
      <div className="font-extrabold flex-1 mr-4">{key}</div>
      <div className="flex-[2] m-auto">{value || "Unknown"}</div>
    </div>
  );
}

export default async function CharacterInfo({ character }: Readonly<Props>) {
  const campaignInfo = await getWithFilter("campaigns", undefined, {
    _id: character.campaignId,
  });
  const campaign = campaignInfo?.data[0] as Campaign;

  return (
    <div className="mb-5 p-5 border rounded-md shadow-md dark:shadow-slate-600 dark:border-slate-600">
      <div className="text-center">
        {character.images.length === 0 ? "No character image(s)" : null}
        {character.images.map((image) => (
          <ImageWithFallback
            src={image}
            fallbackSrc={defaultUser}
            alt={`Image for ${character.name}`}
            width={300}
            height={300}
            className="rounded inline-block"
            key={image.substring(25)}
          />
        ))}
        <br />
        {character.heroforgeLink ? (
          <Link
            href={character.heroforgeLink}
            target="_blank"
            className="primary button !mt-4"
          >
            See {character.pronouns.split("/")[1] ?? "them"} on Heroforge
          </Link>
        ) : null}
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
        {CharacterAttribute("Race", character.race)}
        {CharacterAttribute("Class", character.class)}
        {CharacterAttribute("Alignment", getActualAlignment(character))}
        {CharacterAttribute(
          "Gender and pronouns",
          `${character.gender}${character.gender && character.pronouns ? ", " : ""}${character.pronouns}`
        )}
        {CharacterAttribute("Sexual orientation", character.orientation)}
        {CharacterAttribute("Personality", character.personality)}
        {CharacterAttribute("Backstory", character.backstory)}
      </div>

      {character.songLinks.length > 0 ? (
        <>
          <div className="font-extrabold">
            {character.songLinks.length == 1 ? "Song" : "Songs"}
          </div>
          <div className="flex mt-4 flex-wrap justify-center">
            {character.songLinks.map((link) => (
              <iframe
                className="block mr-4 mb-4"
                width="560"
                height="315"
                src={`https://www.youtube-nocookie.com/embed/${link.trim()}`}
                key={link}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
