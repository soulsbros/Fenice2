"use client";

import { deleteCharacter } from "@/actions/characters";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Edit, Trash2 } from "react-feather";
import Swal from "sweetalert2";
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
    Swal.fire({
      title: "Delete character?",
      text: `Do you really want to delete ${name}? This operation is irreversible!`,
      icon: "warning",
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteCharacter(id);
        router.push("/characters");
      }
    });
  }

  return (
    <div className="text-right">
      <Link href={`/characters/${id}/edit`} className="primary button mr-2">
        <Edit />
      </Link>
      <Button onClick={handleDelete} icon={<Trash2 />} />
    </div>
  );
}
