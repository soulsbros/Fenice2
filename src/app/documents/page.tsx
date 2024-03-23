import { defaultEdition } from "@/lib/skills";
import { redirect } from "next/navigation";

export default async function DocumentsRootPage() {
  redirect(`/documents/${defaultEdition}`);
}
