import Textfield from "./textfield";

interface CharacterFormProps {
  characterId?: string;
}

export default function CharacterForm({
  characterId,
}: Readonly<CharacterFormProps>) {
  return (
    <>
      <Textfield placeholder="Name" />
      <Textfield placeholder="Pronouns" />
      <Textfield placeholder="Genre" />
      <Textfield placeholder="Race" />
      <Textfield placeholder="Class" />
      <Textfield placeholder="Alignment" />

      <div>
        <textarea
          className="p-2 m-2 align-top min-h-[100px] w-[calc(50%-16px)]"
          placeholder="Backstory"
        ></textarea>
        <textarea
          className="p-2 m-2 align-top min-h-[100px] w-[calc(50%-16px)]"
          placeholder="Personality"
        ></textarea>
      </div>

      <button className="button mt-4">Submit</button>
    </>
  );
}
