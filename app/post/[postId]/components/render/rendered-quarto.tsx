"use client";

import { useEffect, useRef, useState } from "react";
import { fetchRender } from "@/lib/api-calls/quarto-api";
import { IdProp } from "@/lib/types/react-props/id-prop";
import ErrorWithMessage from "@/components/error-with-message";
import { setupResize, changeColors } from "./lib/iframe-manipulator";
import { useTheme } from "next-themes";
import { semanticColors } from "@nextui-org/react";
import RenderPending from "./render-pending";
import GenericLoadingPage from "@/loading";
import { idT } from "@/lib/types/api-types";
import { QuartoContainerTypeT } from "@/lib/types/quarto-container";

/**
 * Isolated iframe with a quarto project's rendered html.
 * Detects html's height and sets iframe's height to it.
 * @param id post or branch ID
 * @param container quarto project's container: "post" or "branch"
 */
export default function RenderedQuarto({
  id,
  container,
}: IdProp & Readonly<{ container: QuartoContainerTypeT }>) {
  // State to save data in after it's fetched
  const [html, setHtml] = useState<string | undefined>(undefined);

  // Component status
  const [isLoaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [pending, setPending] = useState(false);

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
    setPending(false);
    setLoaded(false);
    setIframeHeight(300);
    setRerender(!rerender);
  };

  // Fetch html when component renders
  useEffect(() => {
    fetchRender({ id: id as idT, type: container })
      .then((res) => {
        if (res === "pending") {
          setPending(true);
        } else {
          setHtml(res);
        }
      })
      .catch((reason) => {
        console.log(
          `failed to fetch render with id ${id} for reason ${reason}`,
        );
        setFailed(true);
      })
      .finally(() => setLoaded(true));
  }, [id, rerender, container]);

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
  }, [html, iframeRef, rerender, systemTheme, theme]);

  if (failed) {
    return (
      <ErrorWithMessage
        reset={reset}
        message="We failed to get the publication's contents."
      />
    );
  }

  if (pending) {
    return <RenderPending refresh={reset} />;
  }

  if (!isLoaded) {
    return (
      <div className="h-80">
        <GenericLoadingPage />
      </div>
    );
  }

  return (
    <iframe
      title={iframeTitle}
      ref={iframeRef}
      srcDoc={html}
      style={{ width: "100%", height: `${iframeHeight}px`, border: "none" }}
    />
  );
}

// Exported for testing purposes
export const iframeTitle = "Rendered publication";
