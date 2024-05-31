"use client";

import { ClassNameProp } from "@/lib/types/react-props/classname-prop";
import { Image } from "@nextui-org/react";
import { useTheme } from "next-themes";

/**
 * Image component with Alexandria's logo. Adapts color to current theme.
 *
 * @param className CSS classes
 * @param width represents the rendered width in pixels, so it will affect how large the image appears.
 * @param height represents the rendered height in pixels, so it will affect how large the image appears.
 */
export default function Logo({
  className,
  width,
  height,
}: ClassNameProp & { width?: number; height?: number }) {
  const { theme } = useTheme();
  return (
    <Image
      alt="Alexandria logo"
      src={theme === "light" ? "/logo/logo32.svg" : "/logo/logo32white.svg"}
      width={width}
      height={height}
      className={className}
    />
  );
}
