import defaultUser from "@/img/defaultUser.png";
import { NPC } from "@/types/API";
import Link from "next/link";
import { Compass } from "react-feather";
import ImageWithFallback from "./imageWithFallback";

interface NpcCardProps {
  npc: NPC;
}

export default function NpcCard({ npc }: Readonly<NpcCardProps>) {
  return (
    <div className="character-card w-[300px] m-3 p-4 rounded-md shadow-md">
      <Link href={`/npcs/${npc._id}`}>
        <ImageWithFallback
          src={npc.image}
          fallbackSrc={defaultUser}
          alt={`Image for ${npc.name}`}
          width={300}
          height={300}
          className="rounded-md object-cover h-[revert-layer] object-top"
        />
        <h2 className="subtitle mt-4">{npc.name}</h2>
        <p>
          {npc.race} {npc.class}
        </p>
        <p className="flex mt-2">
          <Compass />
          &nbsp; {npc.actualAlignment}
        </p>
      </Link>
    </div>
  );
}
