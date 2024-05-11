import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alexandria",
  description: "Collaborative and open access scientific publishing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const rootCSSClasses =
    "px-8 " +
    "text-black dark:text-white " +
    "bg-neutral-200 dark:bg-neutral-800";

  return (
    <html lang="en">
      <body className={inter.className + " " + rootCSSClasses}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
