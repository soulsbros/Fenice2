"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactElement } from "react";

type SidebarLinkProps = {
  name: string;
  path: string;
  icon: ReactElement;
  disabled?: boolean;
};

function closeMenu() {
  document.querySelector("#menuPanel")?.classList.add("hidden");
}

export default function SidebarLink({
  name,
  path,
  icon,
  disabled = false,
}: SidebarLinkProps) {
  const pathname = usePathname();
  const currentPage =
    path === "/" ? pathname === path : pathname?.startsWith(path);

  return (
    <>
      <Link
        href={disabled ? "" : path}
        onClick={closeMenu}
        className={`flex p-4 hover:bg-blue-300 ${
          disabled ? "cursor-default text-slate-500" : ""
        } ${currentPage ? "text-red-700" : ""}`}
      >
        {icon}
        <p className="ml-3">{name}</p>
      </Link>
    </>
  );
}
