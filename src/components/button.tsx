"use client";

import { signOut } from "next-auth/react";
import { ReactElement } from "react";

interface ButtonProps {
  icon?: ReactElement;
  label?: string;
  tooltip?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({
  label,
  icon,
  tooltip,
  disabled = false,
  onClick,
}: Readonly<ButtonProps>) {
  return (
    <button
      className={`${disabled ? "disabled" : "primary"} button`}
      onClick={disabled ? () => {} : onClick}
      title={tooltip}
    >
      {icon} {label}
    </button>
  );
}

export const LogoutButton = () => {
  return <Button onClick={signOut} label="Logout" />;
};
