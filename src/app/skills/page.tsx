import { skills } from "@/lib/skills";
import { Edition } from "@/types/Skills";
import Link from "next/link";

export default function Skills() {
  return (
    <>
      <p className="font-semibold text-lg">Pathfinder 2e</p>
      <div className="mb-4">
        {skills[Edition.pf2].map((skill) => (
          <Link
            href={`/skills/${Edition.pf2}/${skill.name}`}
            className="inline-block m-3 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            key={skill.name}
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {skill.name}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {skill.ability}
            </p>
          </Link>
        ))}
      </div>
      <p className="font-semibold text-lg">D&D 5e</p>
      <div>
        {skills[Edition.DnD5].map((skill) => (
          <Link
            href={`/skills/${Edition.DnD5}/${skill.name}`}
            className="inline-block m-3 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            key={skill.name}
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {skill.name}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {skill.ability}
            </p>
          </Link>
        ))}
      </div>
      <p className="font-semibold text-lg">D&D 3.5e</p>
      <div>
        {skills[Edition.DnD3].map((skill) => (
          <Link
            href={`/skills/${Edition.DnD3}/${skill.name}`}
            className="inline-block m-3 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            key={skill.name}
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {skill.name}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {skill.ability}
            </p>
          </Link>
        ))}
      </div>
    </>
  );
}
