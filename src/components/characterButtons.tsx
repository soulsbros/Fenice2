"use client";

import { deleteCharacter } from "@/actions/characters";

import Link from "next/link";
import { useRouter } from "next/navigation";
import swal from "sweetalert";
import Button from "./button";

interface CharacterButtonsProps {
  id: string;
  name: string;
}

export default function CharacterButtons({
  id,
  name,
}: Readonly<CharacterButtonsProps>) {
  const router = useRouter();

  async function handleDelete() {
    swal({
      title: "Delete character?",
      text: `Do you really want to delete ${name}? This operation is irreversible!`,
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then(async (hasConfirmed) => {
      if (hasConfirmed) {
        await deleteCharacter(id);
        router.push("/characters");
      }
    });
  }

  return (
    <>
      <Link href={`/characters/${id}/edit`} className="primary button mr-2">
        Edit
      </Link>
      <Button onClick={handleDelete} label="Delete" />
    </>
  );
}
