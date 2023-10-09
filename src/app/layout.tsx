import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import Sidebar from "../components/sidebar";
import icon from "../img/icon.png";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "La Compagnia della Fenice",
  description: "The site of La Compagnia della Fenice",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col`}>
        <header className="bg-red-600 p-3 text-white flex items-center">
          <Image src={icon} width={32} alt="Image of a dice" className="mr-2" />
          La Compagnia della Fenice
        </header>
        <main className="flex flex-1">
          <Sidebar />
          <div className="flex-grow p-3">{children}</div>
        </main>
      </body>
    </html>
  );
}
