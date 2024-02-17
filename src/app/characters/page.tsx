import CharacterInfo from "@/components/characterInfo";
import { Character } from "@/types/API";
import { getCharacters } from "../../actions/characters";

export default async function Characters() {
  const result = await getCharacters({
    field: "campaignId",
    direction: "DESC",
  });

  return (
    <>
      <div className="title">Characters</div>

      {result.success
        ? result?.data.map((character: Character) => (
            <CharacterInfo
              character={character}
              key={character._id?.toString()}
            />
          ))
        : result.message}
    </>
  );
}
