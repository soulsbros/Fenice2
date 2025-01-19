import MenuButton from "@/components/menuButton";
import { Sidebar } from "@/components/navigation";
import UserIndicator from "@/components/userIndicator";
import githubLogo from "@/img/githubLogo.png";
import { baseDesc, baseTitle, baseUrl, getLogo } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import NextAuthProvider from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: `%s - ${baseTitle}`,
    default: baseTitle,
  },
  description: baseDesc,
  authors: [{ name: "Soulsbros", url: "https://soulsbros.ch" }],
  metadataBase: baseUrl,
  openGraph: {
    type: "website",
    url: baseUrl,
    title: {
      template: `%s - ${baseTitle}`,
      default: baseTitle,
    },
    description: baseDesc,
    siteName: baseTitle,
    images: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#dc2626",
  width: "device-width",
  initialScale: 1,
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="en-CH" suppressHydrationWarning>
      <body
        className={`${inter.className} flex flex-col min-w-[300px] bg-main-bg dark:bg-main-bg-dark dark:text-text-white`}
      >
        <ThemeProvider attribute="class">
          <NextAuthProvider>
            <header className="p-2 dark:text-fenice-red text-black flex justify-between items-center">
              <div className="flex items-center">
                <MenuButton />

                <Link href={"/"} className="flex items-center">
                  <Image
                    src={getLogo().icon}
                    width={40}
                    alt="Image of a dice"
                    className="mx-2"
                  />
                  {baseTitle}
                </Link>
              </div>

              <UserIndicator />
            </header>

            <main className="flex flex-1 mx-2 md:mx-10">
              <Sidebar />

              <div className="flex-grow p-3 max-w-full">{children}</div>
            </main>

            <footer className="flex space-x-2 p-4 items-center justify-center">
              <p>
                &copy;{new Date().getFullYear()}{" "}
                <Link
                  href="https://soulsbros.ch"
                  className="hover:text-blue-600"
                >
                  Soulsbros
                </Link>
              </p>
              <Link
                href="https://github.com/soulsbros"
                target="_blank"
                className="hover:rotate-45 transition-all"
              >
                <Image src={githubLogo} width={32} alt="GitHub logo" />
              </Link>
            </footer>
          </NextAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
