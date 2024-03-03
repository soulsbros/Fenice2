import { defaultEdition } from "@/lib/skills";
import { redirect } from "next/navigation";

export default function Skills() {
  redirect(`/skills/${defaultEdition}`);
}
