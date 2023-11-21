"use client";

import { signOut } from "next-auth/react";
import { ReactElement } from "react";

interface ButtonProps {
  icon?: ReactElement;
  label?: string;
  tooltip?: string;
  onClick?: () => void;
}

export default function Button({
  label,
  icon,
  tooltip,
  onClick,
}: Readonly<ButtonProps>) {
  return (
    <button
      className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      onClick={onClick}
      title={tooltip}
    >
      {icon} {label}
    </button>
  );
}

export const LogoutButton = () => {
  return <Button onClick={signOut} label="Logout" />;
};
