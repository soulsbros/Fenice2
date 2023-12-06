import { Character } from "@/types/API";
import Link from "next/link";

interface CharacterInfoProps {
  character: Character;
  trimTexts?: boolean;
}

export default function CharacterInfo({
  character,
  trimTexts = true,
}: Readonly<CharacterInfoProps>) {
  const MAX_TEXT_LENGTH = 500;
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
    <div key={character.characterId} className="mb-8">
      <div className="flex mb-2">
        <div className="w-[50%]">
          <Link
            href={`/characters/${character._id}`}
            className="font-semibold text-lg"
          >
            {character.name}
          </Link>
          {character.pronouns ? (
            <span className="text-sm"> ({character.pronouns})</span>
          ) : null}
          <p className="italic">{character.player}</p>
        </div>
        <div className="w-[50%]">
          <p>
            {character.race || "Unknown race"},{" "}
            {character.class || "Unknown class"}
          </p>
          <p>{character.actualAlignment}</p>
        </div>
      </div>

      <div className="flex">
        <p className="w-[48%] mr-[2%]">
          {backstory || "No backstory data"}
          {trimTexts && character.backstory.length > MAX_TEXT_LENGTH ? (
            <Link href={`characters/${character._id}`}>Read more</Link>
          ) : null}
        </p>
        <p className="w-[50%]">
          {personality || "No personality data"}
          {trimTexts && character.personality.length > MAX_TEXT_LENGTH ? (
            <Link href={`characters/${character._id}`}>Read more</Link>
          ) : null}
        </p>
      </div>
    </div>
  );
}
