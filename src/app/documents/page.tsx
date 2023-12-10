import { editions } from "@/lib/skills";
import { Edition } from "@/types/Skills";
import Link from "next/link";

export default async function Documents() {
  return (
    <>
      <div className="title">Documents</div>

      {editions.map((edition: Edition) => (
        <Link
          href={`/documents/${edition.id}`}
          className="block"
          key={edition.id}
        >
          {edition.name}
        </Link>
      ))}
    </>
  );
}
