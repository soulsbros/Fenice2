"use client";

import { insertCharacter, updateCharacter } from "@/app/actions";
import { Character } from "@/types/API";
import { useFormState, useFormStatus } from "react-dom";
import Textfield from "./textfield";

interface CharacterFormProps {
  previousData?: Character;
}

const initialState = {
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={`${pending ? "disabled" : "primary"} button`}
      disabled={pending}
    >
      Submit
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
          placeholder="Genre"
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
        <Textfield
          placeholder="Alignment"
          name="alignment"
          required
          value={previousData?.actualAlignment}
        />
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

      <SubmitButton />
      <span className="ml-3">{state?.message}</span>
    </form>
  );
}
