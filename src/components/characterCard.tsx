import defaultUser from "@/img/defaultUser.png";
import { Character } from "@/types/API";
import Link from "next/link";
import { Compass, User } from "react-feather";
import ImageWithFallback from "./imageWithFallback";

interface CharacterCardProps {
  character: Character;
  showPlayer?: boolean;
}

export default function CharacterCard({
  character,
  showPlayer = true,
}: Readonly<CharacterCardProps>) {
  return (
    <div className="character-card w-[300px] m-3 p-4 rounded-md shadow-md">
      <Link href={`/characters/${character._id}`}>
        <ImageWithFallback
          src={character.image}
          fallbackSrc={defaultUser}
          alt={`Image for ${character.name}`}
          width={300}
          height={300}
          className="rounded-md object-cover h-[revert-layer] object-top"
        />
        <h2 className="subtitle mt-4">{character.name}</h2>
        <p>
          {character.race} {character.class}
        </p>
        <p className="flex mt-2">
          <Compass />
          &nbsp; {character.actualAlignment}
        </p>
        {showPlayer ? (
          <p className="flex mt-2">
            <User />
            &nbsp; {character.player}
          </p>
        ) : null}
      </Link>
    </div>
  );
}
