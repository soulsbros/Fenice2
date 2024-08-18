import { defaultEdition } from "@/lib/utils";
import { redirect } from "next/navigation";

export default function SkillsRootPage() {
  redirect(`/skills/${defaultEdition}`);
}
