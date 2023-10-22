"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { ReactElement } from "react";

interface ButtonProps {
  icon?: ReactElement;
  label?: string;
  onClick?: () => void;
  href?: string;
}

export default function Button({ label, icon, onClick, href }: ButtonProps) {
  const className =
    "bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded";

  return href ? (
    <Link className={`${className} py-[10px]`} href={href}>
      {icon} {label}
    </Link>
  ) : (
    <button className={className} onClick={onClick}>
      {icon} {label}
    </button>
  );
}

export const LogoutButton = () => {
  return <Button onClick={signOut} label="Logout" />;
};
