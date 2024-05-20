"use client";

import { createHash } from "crypto";
import { signIn, signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Dropdown, { DropdownLink } from "./dropdown";

export default function UserIndicator() {
  const { data: session } = useSession();
  const { resolvedTheme, setTheme } = useTheme();

  // https://docs.gravatar.com/general/hash
  const hash = createHash("sha256")
    .update(session?.user.email?.trim().toLowerCase() ?? "")
    .digest("hex");

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
            {session ? session?.user?.firstName ?? "Loading..." : "Guest"}
          </span>
          <Image
            src={`https://gravatar.com/avatar/${hash}?s=200&d=mp`}
            width={40}
            height={40}
            alt={`Profile picture of ${session?.user?.firstName}`}
            className="mx-2"
          />
        </div>
      }
    />
  );
}
