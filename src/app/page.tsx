import dynamic from "next/dynamic";

const DiceRoller = dynamic(() => import("../components/diceRoller"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <p className="font-semibold text-lg text-center">Roll some dice!</p>
      <DiceRoller />
    </>
  );
}
