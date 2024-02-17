"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { ReactElement } from "react";

interface ButtonProps {
  icon?: ReactElement;
  label?: string;
  tooltip?: string;
  disabled?: boolean;
  onClick?: () => void;
}

interface SubtextButtonProps {
  title: string;
  subtitle: string;
  url: string;
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
      className={`${disabled ? "disabled" : "primary"} button space-x-3`}
      onClick={disabled ? () => {} : onClick}
      title={tooltip}
    >
      {icon}
      {label ? <span>{label}</span> : null}
    </button>
  );
}

export function SubtextButton({
  title,
  subtitle,
  url,
}: Readonly<SubtextButtonProps>) {
  return (
    <Link
      href={url}
      className="inline-block m-3 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">{subtitle}</p>
    </Link>
  );
}

export const LogoutButton = () => {
  return <Button onClick={signOut} label="Logout" />;
};
