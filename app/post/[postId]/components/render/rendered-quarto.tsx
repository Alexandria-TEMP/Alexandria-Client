"use client";

import { useRef, useState } from "react";
import { useRender } from "@/lib/api/hooks/quarto-hooks";
import { IdProp } from "@/lib/types/react-props/id-prop";
import ErrorWithMessage from "@/components/error-with-message";
import RenderPending from "./render-pending";
import GenericLoadingPage from "@/loading";
import { idT } from "@/lib/types/api-types";
import { QuartoContainerTypeT } from "@/lib/types/quarto-container";
import {
  useIframeDynamicHeight,
  useIframeDynamicTheme,
} from "./lib/iframe-hooks";

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
  // Used to trigger a rerender in case of an error
  const [rerender, setRerender] = useState(false);

  // Component data and status
  const {
    data: html,
    isPending,
    isLoading,
    error,
  } = useRender({ id: id as idT, type: container });

  // Reference to iframe, used by iframe hooks
  const iframeRef = useRef<HTMLIFrameElement>(null);
  // Setup to get html height once it first renders
  const iframeHeight = useIframeDynamicHeight(iframeRef, [html, rerender]);
  // Trigger a color change in iframe when theme changes
  useIframeDynamicTheme(iframeRef, [html, rerender]);

  if (error) {
    return (
      <ErrorWithMessage
        reset={() => setRerender(!rerender)}
        message="We failed to get the publication's contents."
      />
    );
  }

  if (isPending) {
    return <RenderPending refresh={() => setRerender(!rerender)} />;
  }

  if (isLoading) {
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