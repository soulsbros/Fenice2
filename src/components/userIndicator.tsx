"use client";

import { getGravatarHash } from "@/lib/authConfig";
import { signIn, signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Dropdown, { DropdownLink } from "./dropdown";

export default function UserIndicator() {
  const { data: session } = useSession();
  const { resolvedTheme, setTheme } = useTheme();
  const hash = getGravatarHash(session?.user.email ?? "");

  let links: DropdownLink[] = [
    {
      title: "Toggle theme",
      onClick: () => setTheme(resolvedTheme === "light" ? "dark" : "light"),
    },
  ];

  if (session) {
    links = [
      { title: "Profile", href: "/profile" },
      ...links,
      { title: "Log out", onClick: () => signOut() },
    ];
  } else {
    links = [...links, { title: "Log in", onClick: () => signIn("keycloak") }];
  }

  return (
    <Dropdown
      links={links}
      className="absolute right-0 top-16 mr-1"
      element={
        <div className="flex items-center">
          <span>
            {session
              ? session?.user?.nickname || session?.user?.firstName
              : "Guest"}
          </span>
          <Image
            src={`https://gravatar.com/avatar/${hash}?s=200&d=mp`}
            width={40}
            height={40}
            alt={`Profile picture of ${session?.user?.nickname ?? session?.user.firstName}`}
            className="mx-2"
            priority={true}
          />
        </div>
      }
    />
  );
}
