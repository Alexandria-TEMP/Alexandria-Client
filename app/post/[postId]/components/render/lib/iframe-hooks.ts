"use client";

import { DependencyList, RefObject, useEffect, useState } from "react";
import { changeColors, setupResize } from "./iframe-manipulator";
import { useTheme } from "next-themes";
import { semanticColors } from "@nextui-org/react";

/**
 * Gets height of HTML inside an iframe
 * @param iframeRef useRef reference to iframe that houses the HTML
 * @param deps if present, effect will only activate if the values in the list change
 */
export function useIframeDynamicHeight(
  iframeRef: RefObject<HTMLIFrameElement>,
  deps: DependencyList,
) {
  const [iframeHeight, setIframeHeight] = useState(300);

  // Setup to get html height once it first renders
  useEffect(() => {
    return setupResize(iframeRef, setIframeHeight);

    // Disable reason: it doesn't like passing deps in arguments
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iframeRef, ...deps]);

  return iframeHeight;
}

/**
 * Injects CSS into an iframe's HTML to make its theme match the website's
 * @param iframeRef useRef reference to iframe that houses the HTML
 * @param deps if present, effect will only activate if the values in the list change
 */
export function useIframeDynamicTheme(
  iframeRef: RefObject<HTMLIFrameElement>,
  deps: DependencyList,
) {
  // Used to match iframe colors to theme
  const { systemTheme, theme } = useTheme();

  useEffect(() => {
    // This hacky type workaround is needed because TypeScript doesn't
    // recognize that `DEFAULT` is a property in the type `ColorScale`
    // track this bug: https://github.com/nextui-org/nextui/issues/1605
    type NextUIColors = {
      foreground: { DEFAULT: string; 700: string };
      content1: { DEFAULT: string };
      content2: { DEFAULT: string };
    };

    // Get current theme colors
    const currentTheme = theme === "system" ? systemTheme : theme;
    const themeColors =
      currentTheme === "dark" ? semanticColors.dark : semanticColors.light;

    // Update html colors to match current theme
    const cleanup = changeColors(iframeRef, {
      background: (themeColors as NextUIColors).content1.DEFAULT,
      text: (themeColors as NextUIColors).foreground.DEFAULT,
      codeBackground: (themeColors as NextUIColors).content2.DEFAULT,
      codeText: (themeColors as NextUIColors).foreground["700"],
    });

    return cleanup;

    // Disable reason: it doesn't like passing deps in arguments
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iframeRef, systemTheme, theme, ...deps]);
}
