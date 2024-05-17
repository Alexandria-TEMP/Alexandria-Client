import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { ChildrenProp } from "./lib/children-prop-type";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alexandria",
  description: "Collaborative and open access scientific publishing.",
};

export default function RootLayout({ children }: ChildrenProp) {
  const rootCSSClasses = "px-8";

  return (
    <html lang="en">
      <body className={inter.className + " " + rootCSSClasses}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
