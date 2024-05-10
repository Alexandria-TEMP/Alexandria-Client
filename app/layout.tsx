import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

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
  const rootClasses = "px-6";
  return (
    <html lang="en" className="dark">
      <body className={inter.className + " " + rootClasses}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
