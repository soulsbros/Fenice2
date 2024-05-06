"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactElement } from "react";

type SidebarLinkProps = {
  name: string;
  path: string;
  icon: ReactElement;
  newTab?: boolean;
  disabled?: boolean;
};

function closeMenu() {
  let divs = document.querySelectorAll("main > div");
  divs[0].classList.add("hidden");
  divs[1].classList.remove("hidden");
}

export default function SidebarLink({
  name,
  path,
  icon,
  newTab = false,
  disabled = false,
}: Readonly<SidebarLinkProps>) {
  const pathname = usePathname();
  const currentPage =
    !path.startsWith("https://") &&
    (path === "/"
      ? pathname === path
      : pathname?.startsWith(`/${path.split("/")[1]}`));
  return (
    <Link
      href={disabled ? "" : path}
      onClick={closeMenu}
      className={`flex p-4 hover:bg-blue-300 ${
        disabled ? "cursor-default text-slate-500" : ""
      } ${currentPage ? "text-red-700" : ""}`}
      target={newTab ? "_blank" : undefined}
    >
      {icon}
      <p className="ml-3">{name}</p>
    </Link>
  );
}
