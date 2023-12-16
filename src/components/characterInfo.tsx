import deafultUser from "@/img/defaultUser.png";
import { Character } from "@/types/API";
import Link from "next/link";
import { ReactElement } from "react";
import ImageWithFallback from "./imageWithFallback";

interface CharacterInfoProps {
  character: Character;
  trimTexts?: boolean;
}

function CharacterAttribute(key: string, value: string | ReactElement) {
  return (
    <span className="inline-block text-center min-w-[200px] mb-2">
      <p className="font-extrabold">{value || `Unknown ${key}`}</p>
      <p>{key}</p>
    </span>
  );
}

export default function CharacterInfo({
  character,
  trimTexts = true,
}: Readonly<CharacterInfoProps>) {
  const MAX_TEXT_LENGTH = 300;
  let backstory = trimTexts
    ? character.backstory.substring(0, MAX_TEXT_LENGTH)
    : character.backstory;
  if (trimTexts && character.backstory.length > MAX_TEXT_LENGTH) {
    backstory += "... ";
  }

  let personality = trimTexts
    ? character.personality.substring(0, MAX_TEXT_LENGTH)
    : character.personality;
  if (trimTexts && character.personality.length > MAX_TEXT_LENGTH) {
    personality += "... ";
  }

  return (
    <div className="mb-10">
      <div className="flex mb-2">
        <Link href={`/characters/${character._id}`} className={`min-w-[150px]`}>
          <ImageWithFallback
            src={`https://lafenice.soulsbros.ch/img/pg/${character.characterId}.jpg`}
            fallbackSrc={deafultUser}
            alt="Character image"
            width={trimTexts ? 150 : 300}
            height={trimTexts ? 150 : 300}
          />
        </Link>

        <div className="flex flex-wrap items-center justify-center">
          {CharacterAttribute(
            "Name",
            <Link
              href={`/characters/${character._id}`}
              className={`min-w-[150px]`}
            >
              {character.name}
              {character.pronouns ? (
                <span className="text-sm"> ({character.pronouns})</span>
              ) : null}
            </Link>
          )}
          {CharacterAttribute("Player", character.player)}
          {!trimTexts ? (
            <>
              {CharacterAttribute("Class", character.class)}
              {CharacterAttribute("Race", character.race)}
              {CharacterAttribute("Alignment", character.actualAlignment)}
            </>
          ) : null}
        </div>
      </div>

      <div className="flex">
        <div className="w-[48%] mr-[2%]">
          <p className="font-extrabold">Backstory</p>
          <p className="break-words">
            {backstory || "No data"}
            {trimTexts && character.backstory.length > MAX_TEXT_LENGTH ? (
              <Link
                href={`characters/${character._id}`}
                className="text-blue-700"
              >
                Read more
              </Link>
            ) : null}
          </p>
        </div>

        <div className="w-[50%]">
          <p className="font-extrabold">Personality</p>
          <p className="break-words">
            {personality || "No data"}
            {trimTexts && character.personality.length > MAX_TEXT_LENGTH ? (
              <Link
                href={`characters/${character._id}`}
                className="text-blue-700"
              >
                Read more
              </Link>
            ) : null}
          </p>
        </div>
      </div>
    </div>
  );
}
