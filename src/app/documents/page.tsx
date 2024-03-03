import { defaultEdition } from "@/lib/skills";
import { redirect } from "next/navigation";

export default async function Documents() {
  redirect(`/documents/${defaultEdition}`);
}
