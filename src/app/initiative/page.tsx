import InitiativeTracker from "@/components/initiativeTracker";
import { authOptions } from "@/lib/authConfig";
import { healthColors } from "@/lib/initiative";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Initiative",
  openGraph: {
    title: "Initiative",
  },
};

export default async function InitiativePage() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <p className="title">Initiative tracker</p>

      <InitiativeTracker session={session!} />

      <div>
        <span className="inline-block align-top mr-4">
          <p className="subtitle mt-4">HP color scale</p>
          <p className={healthColors[0]}>100% - Untouched</p>
          <p className={healthColors[1]}>81-99% - Barely injured</p>
          <p className={healthColors[2]}>61-80% - Lightly injured</p>
          <p className={healthColors[3]}>41-60% - Injured</p>
          <p className={healthColors[4]}>21-40% - Gravely injured</p>
          <p className={healthColors[5]}>1-20% - Near death</p>
          <p className={healthColors[5]}>0% - Unconscious</p>
        </span>
        <span className="inline-block align-top">
          <p className="subtitle mt-4">Characters legend</p>
          <p className="text-enemy">Enemy</p>
          <p className="text-ally">Ally</p>
          <p className="text-player">Player</p>
        </span>
      </div>
    </>
  );
}
