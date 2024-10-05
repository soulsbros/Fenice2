import { defaultCampaign } from "@/lib/utils";
import { redirect } from "next/navigation";

export default async function NpcsRootPage() {
  redirect(`/npcs/by-campaign/${defaultCampaign}`);
}
