import CharacterInfo from "@/components/characterInfo";
import { Character } from "@/types/API";
import { getCharacters } from "../actions";

export default async function Characters() {
  const result = await getCharacters("campaignId");

  return (
    <>
      <div className="title">Characters</div>

      {result.success
        ? result?.data.map((character: Character) => (
            <CharacterInfo character={character} key={character.characterId} />
          ))
        : result.message}
    </>
  );
}
