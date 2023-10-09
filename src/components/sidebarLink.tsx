"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactElement } from "react";

type Props = {
  name: string;
  path: string;
  icon: ReactElement;
  disabled?: boolean;
};

export default function SidebarLink({
  name,
  path,
  icon,
  disabled = false,
}: Props) {
  const pathname = usePathname();
  const currentPage = pathname === path;

  return (
    <>
      <div
        className={`flex p-4 hover:bg-blue-300 ${
          disabled ? "cursor-default" : "cursor-pointer"
        }`}
      >
        {icon}
        <Link
          href={disabled ? "" : path}
          className={`ml-3 ${disabled ? "cursor-default text-slate-500" : ""} ${
            currentPage ? "text-red-700" : ""
          }`}
        >
          {name}
        </Link>
      </div>
    </>
  );
}
