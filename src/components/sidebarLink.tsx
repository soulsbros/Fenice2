import Link from "next/link";
import { ReactElement } from "react";

type Props = {
  name: string;
  path: string;
  icon: ReactElement;
};

export default function SidebarLink({ name, path, icon }: Props) {
  return (
    <>
      <div className="flex p-4 hover:bg-blue-300">
        {icon}
        <Link href={path} className="ml-3">
          {name}
        </Link>
      </div>
    </>
  );
}
