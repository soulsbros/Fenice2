import { getCampaigns } from "@/actions/characters";
import defaultUser from "@/img/defaultUser.png";
import { Campaign, Character } from "@/types/API";
import Link from "next/link";
import { AlertCircle, Compass, User, Users } from "react-feather";
import ImageWithFallback from "./imageWithFallback";

interface CharacterCardProps {
  character: Character;
  showPlayer?: boolean;
}

const countEmptyFields = (character: Character) => {
  const fieldsToCheck = [
    "backstory",
    "personality",
    "gender",
    "pronouns",
    "orientation",
  ] as (keyof Character)[];
  let emptyFields = 0;

  for (const field of fieldsToCheck) {
    if (character[field] == "") {
      ++emptyFields;
    }
  }
  return emptyFields;
};

export default async function CharacterCard({
  character,
  showPlayer = true,
}: Readonly<CharacterCardProps>) {
  const emptyFields = countEmptyFields(character);
  const campaign = await getCampaigns(undefined, { _id: character.campaignId });
  const campaignName = (campaign.data[0] as Campaign).name;

  return (
    <div className="character-card w-[300px] m-3 p-4 rounded-md shadow-md">
      <Link href={`/characters/${character._id}`}>
        <ImageWithFallback
          src={character.images[0]}
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
        <p className="flex mt-2" title="Alignment">
          <Compass />
          &nbsp; {character.actualAlignment}
        </p>
        {showPlayer ? (
          <p className="flex mt-2" title="Player">
            <User />
            &nbsp; {character.player}
          </p>
        ) : (
          <p className="flex mt-2" title="Campaign">
            <Users />
            &nbsp; {campaignName}
          </p>
        )}
        {!showPlayer && emptyFields > 0 ? (
          <p
            className="flex mt-2 justify-end text-red-600"
            title="Empty fields"
          >
            <AlertCircle />
            &nbsp; <span>{emptyFields}</span>
          </p>
        ) : null}
      </Link>
    </div>
  );
}
