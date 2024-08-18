import { defaultEdition } from "@/lib/utils";
import { redirect } from "next/navigation";

export default async function DocumentsRootPage() {
  redirect(`/documents/${defaultEdition}`);
}
