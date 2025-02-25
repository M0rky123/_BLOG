import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Internetový blog",
  description: "Maturitní práce - Internetový blog",
  authors: [{ name: "Vojtěch Smutný" }],
  keywords: ["maturitní práce", "blog"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body className={openSans.variable}>{children}</body>
    </html>
  );
}
