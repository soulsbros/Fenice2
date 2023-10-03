import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "../components/sidebar";
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
      <body className={inter.className + " flex flex-col"}>
        <header className="bg-red-600 p-3 text-white">
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
