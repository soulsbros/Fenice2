"use client";

import {
  getCampaigns,
  insertCharacter,
  updateCharacter,
} from "@/actions/characters";
import { insertNpc, updateNpc } from "@/actions/npcs";
import { alignments, getActualAlignment } from "@/lib/alignment";
import { showAlert } from "@/lib/utils";
import { Campaign, Character, NPC } from "@/types/API";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Info } from "react-feather";
import Select from "./select";
import Textfield from "./textfield";

interface Props {
  previousData?: Character | NPC;
  isNpc?: boolean;
}

const initialState = {
  message: "",
};

function SubmitButton({ previousData }: Readonly<Props>) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={`${pending ? "disabled" : "primary"} button`}
      disabled={pending}
    >
      {previousData ? "Update" : "Submit"}
    </button>
  );
}

export default function CharacterForm({
  previousData,
  isNpc = false,
}: Readonly<Props>) {
  const updateAction = isNpc ? updateNpc : updateCharacter;
  const insertAction = isNpc ? insertNpc : insertCharacter;
  const [state, formAction] = useFormState(
    previousData ? updateAction : insertAction,
    initialState
  );

  const searchParams = useSearchParams();
  const campaignParam = searchParams?.get("c") ?? "";

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await getCampaigns();
      setCampaigns(response.data.reverse() as Campaign[]);
    }
    fetchData();
  }, []);

  return (
    <form action={formAction}>
      <input type="hidden" value={previousData?._id?.toString()} name="_id" />
      <div>
        <Textfield
          placeholder="Name"
          name="name"
          defaultValue={previousData?.name}
          required
        />
        <Textfield
          placeholder="Race"
          name="race"
          required={!isNpc}
          defaultValue={previousData?.race}
        />
        <Textfield
          placeholder="Class"
          name="class"
          required={!isNpc}
          defaultValue={previousData?.class}
        />
      </div>

      <div>
        <Textfield
          placeholder="Pronouns"
          name="pronouns"
          defaultValue={previousData?.pronouns}
        />
        <Textfield
          placeholder="Gender"
          name="gender"
          defaultValue={previousData?.gender}
        />
        <Textfield
          placeholder="Orientation"
          name="orientation"
          defaultValue={previousData?.orientation}
        />
        <Info
          size={18}
          className="inline-block mr-1"
          onClick={() => {
            showAlert({
              html: `Defines how your character handles romantic and sexual attraction. Some common ones include:<br><br>
              <img src="/assets/orientations.png">`,
              showCancelButton: false,
            });
          }}
        />
        {isNpc ? (
          <Textfield
            placeholder="Status"
            name="status"
            defaultValue={(previousData as NPC)?.status ?? "Alive"}
          />
        ) : null}
      </div>

      <div>
        {!isNpc ? (
          <Select
            placeholder="Alignment"
            name="alignment"
            options={alignments.map((alignment) => {
              return { name: alignment, value: alignment };
            })}
            required
            selectedItem={getActualAlignment(previousData as Character)}
          />
        ) : null}
        {campaigns.length === 0 ? (
          <div className="inline-block">
            Campaign
            <br />
            Loading...
          </div>
        ) : (
          <Select
            placeholder="Campaign"
            name="campaignId"
            options={campaigns.map((campaign) => {
              return { name: campaign.name, value: campaign._id!.toString() };
            })}
            required
            selectedItem={previousData?.campaignId.toString() ?? campaignParam}
          />
        )}
        <div className="inline-block">
          Image(s)
          <Info
            size={18}
            className="inline-block ml-1"
            onClick={() => {
              showAlert({
                html: `You can add multiple images.<br> If you're editing a character,
                  any image you upload here will be added to the already existing ones.<br>
                  Contact Steeven if you need to remove an image.`,
                showCancelButton: false,
              });
            }}
          />
          <br />
          <input
            type="file"
            name="images"
            className="p-2 m-2"
            multiple
            accept="image/png, image/jpeg, image/gif, image/webp"
          />
        </div>
      </div>

      <div className="mb-2">
        <span className="inline-block m-2 min-w-[calc(50%-16px)]">
          Backstory
          <br />
          <textarea
            className="p-2 m-2 min-h-[300px] w-full"
            placeholder="Backstory"
            name="backstory"
            defaultValue={previousData?.backstory}
          ></textarea>
        </span>
        <span className="inline-block m-2 min-w-[calc(50%-16px)]">
          Personality
          <br />
          <textarea
            className="p-2 m-2 min-h-[300px] w-full"
            placeholder="Personality"
            name="personality"
            defaultValue={previousData?.personality}
          ></textarea>
        </span>
      </div>

      <SubmitButton previousData={previousData} />
      <span className="ml-3">{state?.message}</span>
    </form>
  );
}
