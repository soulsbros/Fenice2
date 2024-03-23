import CharacterForm from "@/components/characterForm";

export default async function NewNpcPage() {
  return (
    <>
      <div className="title">New NPC</div>
      <CharacterForm isNpc />
    </>
  );
}
