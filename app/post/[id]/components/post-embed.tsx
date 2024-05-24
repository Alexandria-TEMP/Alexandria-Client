"use client";

import React, { useEffect, useRef, useState } from "react";
import { Skeleton } from "@nextui-org/react";
import getPostData from "@/lib/api-calls/post-api";
import { getRenderedVersion } from "@/lib/api-calls/version-api";

export default function PostEmbed({ postId }: Readonly<{ postId: string }>) {
  const [html, setHtml] = useState<string | undefined>(undefined);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    console.log("in useEffect");
    async function getRender() {
      const post = await getPostData(postId);
      const render = await getRenderedVersion(post.version);

      setHtml(render);
      setLoaded(true);
    }
    getRender().catch(() => console.log("something went wrong")); // TODO better error handling
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
