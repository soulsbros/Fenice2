import UserIndicator from "@/components/login";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import Sidebar from "../components/sidebar";
import icon from "../img/icon.png";
import "./globals.css";
import { NextAuthProvider } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "La Compagnia della Fenice",
  description: "The site of La Compagnia della Fenice",
  authors: [{ name: "Soulsbros", url: "https://soulsbros.ch" }],
  viewport: { width: "device-width", initialScale: 1 },
  metadataBase: new URL("https://fenice2.soulsbros.ch"),
  openGraph: {
    type: "website",
    url: "/",
    title: "La Compagnia della Fenice",
    description: "The site of La Compagnia della Fenice",
    siteName: "La Compagnia della Fenice",
    images: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col`}>
        <header className="bg-red-600 p-3 text-white flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src={icon}
              width={32}
              alt="Image of a dice"
              className="mr-2"
            />
            La Compagnia della Fenice
          </div>
          <UserIndicator />
        </header>
        <main className="flex flex-1">
          <Sidebar />
          <div className="flex-grow p-3 max-w-full">
            <NextAuthProvider>{children}</NextAuthProvider>
          </div>
        </main>
      </body>
    </html>
  );
}
