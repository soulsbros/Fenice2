import CharacterInfo from "@/components/characterInfo";
import fetcher from "@/lib/fetcher";
import { Character } from "@/types/API";

export default async function Characters() {
  const characters = await fetcher(`/api/characters`);

  return (
    <>
      <div className="title">Characters</div>

      {characters.map((character: Character) => (
        <CharacterInfo character={character} key={character._id} />
      ))}
    </>
  );
}
