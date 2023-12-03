import { Character } from "@/types/API";

interface CharacterInfoProps {
  character: Character;
}

export default function CharacterInfo({
  character,
}: Readonly<CharacterInfoProps>) {
  return (
    <div key={character.characterID} className="mb-8">
      <div className="flex mb-2">
        <div className="w-[50%]">
          <span className="font-semibold text-lg">{character.name}</span>
          <span className="text-sm"> ({character.pronouns})</span>
          <p className="italic">{character.player}</p>
        </div>
        <div className="w-[50%]">
          <p>
            {character.race}, {character.class}
          </p>
          <p>{character.alignment}</p>
        </div>
      </div>

      <div className="flex">
        <p className="w-[48%] mr-[2%]">
          {character.background || "No backstory data"}
        </p>
        <p className="w-[50%]">
          {character.character || "No personality data"}
        </p>
      </div>
    </div>
  );
}
