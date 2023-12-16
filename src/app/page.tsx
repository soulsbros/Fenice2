import dynamic from "next/dynamic";
import Link from "next/link";

const DiceRoller = dynamic(() => import("@/components/diceRoller"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <p className="title">Welcome!</p>
      <p className="mb-4">
        This is the new site for our D&D group. Feel free to start exploring by
        browsing the tabs on the left sidebar! More features to come ＼(＾O＾)／
        <br />
        Audio recording are still hosted on the{" "}
        <Link href="https://lafenice.soulsbros.ch" className="underline">
          old website
        </Link>{" "}
        for now.
      </p>

      <p className="subtitle">Roll some dice!</p>
      <DiceRoller />
    </>
  );
}
