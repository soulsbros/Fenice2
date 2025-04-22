import defaultUser from "@/img/defaultUser.png";
import { NPC } from "@/types/API";
import Link from "next/link";
import { Activity } from "react-feather";
import ImageWithFallback from "./imageWithFallback";

interface Props {
  npc: NPC;
}

export default function NpcCard({ npc }: Readonly<Props>) {
  return (
    <div className="w-[300px] m-3 p-4 rounded-md shadow-md dark:shadow-slate-600">
      <Link href={`/npcs/${npc._id}`}>
        <ImageWithFallback
          src={npc.images[0]}
          fallbackSrc={defaultUser}
          alt={`Image for ${npc.name}`}
          width={300}
          height={300}
          className="rounded-md object-cover h-[revert-layer] object-top"
        />
        <h2 className="subtitle mt-4">{npc.name}</h2>
        <p title="Race and class">
          {npc.race} {npc.class}
        </p>
        <p className="flex mt-2" title="Status">
          <Activity />
          &nbsp; {npc.status || "Unknown"}
        </p>
        <p className="mt-2">{npc.backstory}</p>
      </Link>
    </div>
  );
}
