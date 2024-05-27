"use client";

import { useEffect, useRef, useState } from "react";
import { Skeleton } from "@nextui-org/react";
import { getRenderedVersion } from "@/lib/api-calls/version-api";
import { IdProp } from "@/lib/id-prop";
import Error from "./error";
import { setupResize } from "./lib/setup-resize";

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

  // Make changes to html
  useEffect(() => {
    // Setup to get html height once it first renders
    const resizeCleanup = setupResize(iframeRef, setIframeHeight);

    return () => {
      resizeCleanup();
    };
  }, [html, iframeRef, rerender]);

  if (failed) {
    return <Error reset={reset} />;
  }

  // TODO sandbox (ie remove permissions) from iframe, check if interactivity still works then
  // TODO try to make html's css match websites dark/light mode

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
