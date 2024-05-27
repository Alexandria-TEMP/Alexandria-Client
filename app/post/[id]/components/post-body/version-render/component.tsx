"use client";

import { useEffect, useRef, useState } from "react";
import { Skeleton } from "@nextui-org/react";
import { getRenderedVersion } from "@/lib/api-calls/version-api";
import { IdProp } from "@/lib/id-prop";
import Error from "./error";
import { setupResize, changeColors } from "./lib/iframe-manipulator";
import { useTheme } from "next-themes";
import { semanticColors } from "@nextui-org/react";

/**
 * Isolated iframe with a Version's rendered html.
 * Detects html's height and sets iframe's height to it.
 *
 * @param id Version ID
 */
export default function VersionRender({ id }: IdProp) {
  // State to save data in after it's fetched
  const [html, setHtml] = useState<string | undefined>(undefined);

  // Component status
  const [isLoaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  // Used to trigger a rerender in case of an error
  const [rerender, setRerender] = useState(false);

  // Used to match iframe colors to theme
  const { systemTheme, theme } = useTheme();

  // Reference to iframe, used to get html's height
  const iframeRef = useRef<HTMLIFrameElement>(null);
  // State with iframe's height, used to update it once we have html's height
  const [iframeHeight, setIframeHeight] = useState(300);

  const reset = () => {
    setFailed(false);
    setLoaded(false);
    setIframeHeight(300);
    setRerender(!rerender);
  };

  // Fetch html when component renders
  useEffect(() => {
    getRenderedVersion(id)
      .then((res) => {
        setHtml(res);
      })
      .catch((reason) => {
        console.log(
          `failed to fetch version ${id} render for reason ${reason}`,
        );
        setFailed(true);
      })
      .finally(() => setLoaded(true));
  }, [id, rerender]);

  // Setup to get html height once it first renders
  useEffect(() => {
    return setupResize(iframeRef, setIframeHeight);
  }, [html, iframeRef, rerender]);

  // Trigger a color change in iframe when theme changes
  useEffect(() => {
    // This hacky type workaround is needed because TypeScript doesn't
    // recognize that `DEFAULT` is a property in the type `ColorScale`
    // track this bug: https://github.com/nextui-org/nextui/issues/1605
    type NextUIColors = {
      overlay: { DEFAULT: string };
      foreground: { DEFAULT: string };
      content1: { DEFAULT: string };
      content2: { DEFAULT: string };
    };

    // Get current theme colors
    const currentTheme = theme === "system" ? systemTheme : theme;
    const themeColors =
      currentTheme === "dark" ? semanticColors.dark : semanticColors.light;

    // Update html colors to match current theme
    changeColors(iframeRef, {
      background: (themeColors as NextUIColors).content1.DEFAULT,
      text: (themeColors as NextUIColors).foreground.DEFAULT,
    });
  }, [html, iframeRef, rerender, systemTheme, theme]);

  if (failed) {
    return <Error reset={reset} />;
  }

  // TODO sanitize html

  return (
    <Skeleton isLoaded={isLoaded} className="rounded-lg">
      <iframe
        ref={iframeRef}
        srcDoc={html}
        style={{ width: "100%", height: `${iframeHeight}px`, border: "none" }}
      />
    </Skeleton>
  );
}
