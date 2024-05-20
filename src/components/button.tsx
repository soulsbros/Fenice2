"use client";

import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { ReactElement } from "react";

interface ButtonProps {
  icon?: ReactElement;
  label?: string;
  tooltip?: string;
  disabled?: boolean;
  className?: string;
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
  className,
  disabled = false,
  onClick,
}: Readonly<ButtonProps>) {
  return (
    <button
      className={`${disabled ? "disabled" : "primary"} button ${className ?? null}`}
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

export function LogoutButton() {
  return <Button onClick={signOut} label="Logout" />;
}

export function ChangeThemeButton() {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <Button
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
      label="Change theme"
    />
  );
}
