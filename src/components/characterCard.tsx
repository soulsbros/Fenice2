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
          // TODO remove this check once legacy image API is not needed anymore
          src={
            character.characterId
              ? `https://lafenice.soulsbros.ch/img/pg/${character.characterId}.jpg`
              : character.image
          }
          fallbackSrc={defaultUser}
          alt="Character image"
          width={300}
          height={300}
          className="rounded-md"
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
            &nbsp; {character.player.split(" ")[0]}
          </p>
        ) : null}
      </Link>
    </div>
  );
}
