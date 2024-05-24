"use client";

import React, { useEffect, useRef, useState } from "react";
import { Skeleton } from "@nextui-org/react";
import { getRenderedVersion } from "@/lib/api-calls/version-api";
import { IdProp } from "@/lib/id-prop";

export default function VersionRender({ id }: IdProp) {
  const [html, setHtml] = useState<string | undefined>(undefined);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    getRenderedVersion(id)
      .then((res) => {
        setHtml(res);
        setLoaded(true);
      })
      .catch(() => console.log("something went wrong")); // TODO better error handling
  });

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = useState("300px");

  useEffect(() => {
    const handleIframeLoad = () => {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        injectScript(iframeRef.current);
      }
    };

    const handleMessage = (event: MessageEvent<{ height: number }>) => {
      if (event.data) {
        setIframeHeight(`${event.data.height}px`);
      }
    };

    const injectScript = (iframe: HTMLIFrameElement) => {
      const scriptContent = `
        (function() {
          function sendHeight() {
            const height = document.documentElement.scrollHeight;
            window.parent.postMessage({ height: height }, '*');
          }
          sendHeight();
          window.addEventListener('resize', sendHeight);
        })();
      `;
      const script = iframe.contentDocument?.createElement("script");
      if (script) {
        script.textContent = scriptContent;
        if (iframe.contentDocument) {
          iframe.contentDocument.body.appendChild(script);
        }
      }
    };

    window.addEventListener("message", handleMessage);

    if (iframeRef.current) {
      iframeRef.current.addEventListener("load", handleIframeLoad);
      if (iframeRef.current.contentDocument?.readyState === "complete") {
        handleIframeLoad();
      }
    }

    const current = iframeRef.current;

    return () => {
      window.removeEventListener("message", handleMessage);
      if (current) {
        current.removeEventListener("load", handleIframeLoad);
      }
    };
  }, []);

  return (
    <Skeleton isLoaded={isLoaded}>
      <iframe
        ref={iframeRef}
        srcDoc={isLoaded ? html : ""}
        style={{ width: "100%", height: iframeHeight, border: "none" }}
      />
    </Skeleton>
  );
}
