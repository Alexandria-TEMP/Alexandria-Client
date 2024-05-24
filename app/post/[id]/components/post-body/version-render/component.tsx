"use client";

import React, { useEffect, useRef, useState } from "react";
import { Skeleton } from "@nextui-org/react";
import { getRenderedVersion } from "@/lib/api-calls/version-api";
import { IdProp } from "@/lib/id-prop";
import Error from "./error";

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

  // Setup to get html height once it first renders
  useEffect(() => {
    // First: make it so html sends a message to its parent window with its height

    // Injects a script into the html to make it send the desired message
    const injectScript = (iframe: HTMLIFrameElement) => {
      // Creates a <script> tag
      const script = iframe.contentDocument?.createElement("script");
      if (!script) return;
      // Set content of <script> to a script that sends message with height
      script.textContent = `
      (function() {
        function sendHeight() {
            const height = document.documentElement.scrollHeight;
            window.parent.postMessage({ height: height }, '*');
          }
          sendHeight();
          window.addEventListener('resize', sendHeight);
        })();
        `;
      // Inject the script in the html
      if (iframe.contentDocument) {
        iframe.contentDocument.body.appendChild(script);
      }
    };

    const iframe = iframeRef.current; // Shorter name

    // When iframe loads, inject script into html
    const handleIframeLoad = () => {
      if (iframe && iframe.contentWindow) {
        injectScript(iframe);
      }
    };

    if (iframe) {
      // Add a listener to actually inject when it loads
      iframe.addEventListener("load", handleIframeLoad);
      // Or just call it if it already loaded
      if (iframe.contentDocument?.readyState === "complete") {
        handleIframeLoad();
      }
    }

    // Second: use the data sent by the html to update the iframe's height

    const handleHtmlsMessage = (message: MessageEvent<{ height: number }>) => {
      // Sets the height state to what the html sent in message
      if (!message.data) return;
      setIframeHeight(message.data.height);
    };

    // Add a listener to actually set the height when a message is sent
    window.addEventListener("message", handleHtmlsMessage);

    return () => {
      // Cleanup: Remove the listeners
      window.removeEventListener("message", handleHtmlsMessage);
      if (iframe) {
        iframe.removeEventListener("load", handleIframeLoad);
      }
    };
  }, [html, iframeRef, rerender]);

  if (failed) {
    return <Error reset={reset} />;
  }

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
