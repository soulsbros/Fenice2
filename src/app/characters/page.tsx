import CharacterInfo from "@/components/characterInfo";
import { Character } from "@/types/API";

export default async function Characters() {
  const URL = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
  const data = await fetch(`${URL}/api/characters`);
  const characters = await data.json();

  return (
    <>
      <div className="title">Characters</div>

      {characters.map((character: Character) => (
        <CharacterInfo character={character} key={character._id} />
      ))}
    </>
  );
}
