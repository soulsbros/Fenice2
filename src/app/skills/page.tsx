import { skills } from "@/util/pf2skills";
import Link from "next/link";

export default function Skills() {
  return (
    <div>
      {skills.map((skill) => (
        <Link
          href={`/skills/${skill.name}`}
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
  );
}
