import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { ChildrenProp } from "./lib/types/react-props/children-prop";
import AlexandriaNavbar from "./components/layout/navbar";
import Footer from "./components/layout/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alexandria",
  description: "Collaborative and open access scientific publishing.",
};

/**
 * Root layout. Required by NextJS.
 */
export default function RootLayout({ children }: ChildrenProp) {
  // Applied to everything (including header and footer)
  const rootClassName = "h-dvh flex flex-col";
  // Applied to the parent of everything in between header and footer
  const bodyClassName = "px-24 grow";

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers className={rootClassName}>
          <AlexandriaNavbar />
          <div className={bodyClassName}>{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
