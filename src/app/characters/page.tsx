import { defaultCampaign } from "@/lib/utils";
import { redirect } from "next/navigation";

export default async function CharactersRootPage() {
  redirect(`/characters/by-campaign/${defaultCampaign}`);
}
