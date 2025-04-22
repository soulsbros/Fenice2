import { getCampaigns } from "@/actions/characters";
import defaultUser from "@/img/defaultUser.png";
import { getActualAlignment } from "@/lib/alignment";
import { authOptions } from "@/lib/authConfig";
import { Campaign, Character } from "@/types/API";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { AlertCircle, Compass, User, Users } from "react-feather";
import ImageWithFallback from "./imageWithFallback";

interface Props {
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
  let emptyFields = [] as string[];
  let emptyFieldsCount = 0;

  for (const field of fieldsToCheck) {
    if (character[field] == "") {
      ++emptyFieldsCount;
      emptyFields.push(field);
    }
  }
  return { emptyFields, emptyFieldsCount };
};

export default async function CharacterCard({
  character,
  showPlayer = true,
}: Readonly<Props>) {
  const { emptyFields, emptyFieldsCount } = countEmptyFields(character);
  const campaign = await getCampaigns(undefined, { _id: character.campaignId });
  const campaignName = (campaign.data[0] as Campaign).name;
  const userData = await getServerSession(authOptions);

  return (
    <div className="w-[300px] m-3 p-4 rounded-md shadow-md dark:shadow-slate-600">
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
        <p className="break-all" title="Race and class">
          {character.race} {character.class}
        </p>
        <p className="flex mt-2" title="Alignment">
          <Compass />
          &nbsp; {getActualAlignment(character)}
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
        {character.playerEmail == userData?.user.email &&
        emptyFieldsCount > 0 ? (
          <p
            className="flex mt-2 justify-end text-fenice-red"
            title={`Missing fields: ${emptyFields.join(", ")}`}
          >
            <AlertCircle />
            &nbsp; <span>{emptyFieldsCount}</span>
          </p>
        ) : null}
      </Link>
    </div>
  );
}
