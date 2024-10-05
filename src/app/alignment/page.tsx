import { defaultCampaign } from "@/lib/utils";
import { redirect } from "next/navigation";

export default async function AlignmentRootPage() {
  redirect(`/alignment/by-campaign/${defaultCampaign}`);
}
