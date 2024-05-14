"use client";

import { SessionProvider } from "next-auth/react";

interface Props {
  children?: React.ReactNode;
}

export default function NextAuthProvider({ children }: Readonly<Props>) {
  return <SessionProvider>{children}</SessionProvider>;
}
