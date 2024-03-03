"use client";

import {
  getCampaigns,
  insertCharacter,
  updateCharacter,
} from "@/actions/characters";
import { alignments } from "@/lib/alignment";
import { Campaign, Character } from "@/types/API";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import Select from "./select";
import Textfield from "./textfield";

interface CharacterFormProps {
  previousData?: Character;
}

const initialState = {
  message: "",
};

function SubmitButton({ previousData }: Readonly<CharacterFormProps>) {
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
}: Readonly<CharacterFormProps>) {
  const [state, formAction] = useFormState(
    previousData ? updateCharacter : insertCharacter,
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
          value={previousData?.name}
          required
        />
        <Textfield
          placeholder="Pronouns"
          name="pronouns"
          value={previousData?.pronouns}
        />
        <Textfield
          placeholder="Gender"
          name="genre"
          value={previousData?.genre}
        />
        <Textfield
          placeholder="Sexual orientation"
          name="orientation"
          value={previousData?.orientation}
        />
      </div>

      <div>
        <Textfield
          placeholder="Race"
          name="race"
          required
          value={previousData?.race}
        />
        <Textfield
          placeholder="Class"
          name="class"
          required
          value={previousData?.class}
        />
        <Select
          placeholder="Alignment"
          name="alignment"
          options={alignments.map((alignment) => {
            return { name: alignment, value: alignment };
          })}
          required
          selectedItem={previousData?.actualAlignment}
        />
      </div>

      <div>
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

        <div className="inline-block ml-6">
          Character image
          <br />
          <input type="file" name="image" />
        </div>
      </div>

      <div className="mb-2">
        <textarea
          className="p-2 m-2 align-top min-h-[300px] w-[calc(50%-16px)]"
          placeholder="Backstory"
          name="backstory"
          defaultValue={previousData?.backstory}
        ></textarea>
        <textarea
          className="p-2 m-2 align-top min-h-[300px] w-[calc(50%-16px)]"
          placeholder="Personality"
          name="personality"
          defaultValue={previousData?.personality}
        ></textarea>
      </div>

      <SubmitButton previousData={previousData} />
      <span className="ml-3">{state?.message}</span>
    </form>
  );
}
