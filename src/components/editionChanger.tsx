"use client";

import { editions } from "@/lib/skills";
import { useRouter } from "next/navigation";

interface EditionChangerProps {
  currentEdition: string;
}

export default function EditionChanger({
  currentEdition,
}: Readonly<EditionChangerProps>) {
  const router = useRouter();
  return (
    <>
      <label htmlFor="edition" className="block mb-2 text-sm font-medium">
        Select an edition
      </label>

      <select
        id="edition"
        className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
        defaultValue={currentEdition}
        onChange={(el) => router.push(`/documents/${el.target.value}`)}
      >
        {editions.map((edition) => (
          <option key={edition.name} value={edition.id}>
            {edition.name}
          </option>
        ))}
      </select>
    </>
  );
}
