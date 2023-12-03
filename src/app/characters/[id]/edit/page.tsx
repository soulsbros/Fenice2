import CharacterForm from "@/components/characterForm";

export default function EditCharacter({
  params,
}: Readonly<{
  params: { id: string };
}>) {
  let { id } = params;

  return (
    <>
      <div className="title">Edit character</div>
      <CharacterForm characterId={id} />
    </>
  );
}
