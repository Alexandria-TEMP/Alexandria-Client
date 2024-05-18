import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { ChildrenProp } from "./lib/children-prop-type";
import AlexandriaNavbar from "./components/navbar";
import Footer from "./components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alexandria",
  description: "Collaborative and open access scientific publishing.",
};

export default function RootLayout({ children }: ChildrenProp) {
  const bodyCSSClasses = "px-24";

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AlexandriaNavbar />
          <div className={bodyCSSClasses}>{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
