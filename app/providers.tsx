"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ChildrenProp } from "./lib/children-prop-type";

/**
 * Wrapper for the entire website. Should be very close to the root in the html tree.
 *
 * @param children React children.
 */
export function Providers({ children }: ChildrenProp) {
  return (
    /* Enables NexUI components. Read more: https://nextui.org/docs/guide/installation#provider-setup. */
    <NextUIProvider>
      {/* Enables dark/light mode using next-themes. */}
      <NextThemesProvider attribute="class">{children}</NextThemesProvider>
    </NextUIProvider>
  );
}
