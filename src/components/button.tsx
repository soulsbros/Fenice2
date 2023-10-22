"use client";

import { signOut } from "next-auth/react";
import { ReactElement } from "react";

interface ButtonProps {
  icon?: ReactElement;
  label?: string;
  onClick?: () => void;
}

export default function Button({ label, icon, onClick }: ButtonProps) {
  const className =
    "bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded";

  return (
    <button className={className} onClick={onClick}>
      {icon} {label}
    </button>
  );
}

export const LogoutButton = () => {
  return <Button onClick={signOut} label="Logout" />;
};
