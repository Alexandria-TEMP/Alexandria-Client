"use client";

import React, { useEffect, useRef, useState } from "react";
import getPostData from "../lib/post-api";
import { Skeleton } from "@nextui-org/react";

export default function PostEmbed({ postId }: Readonly<{ postId: string }>) {
  const [data, setData] = useState<any>(null); // TODO don't use 'any'!
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    console.log("in useEffect");
    getPostData(postId).then((data) => {
      console.log("got data");
      setData(data);
      setLoaded(true);
    });
  });

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = useState("300px");

  useEffect(() => {
    const handleIframeLoad = () => {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        injectScript(iframeRef.current);
      }
    };

    const handleMessage = (event: MessageEvent) => {
      if (event.data && typeof event.data.height === "number") {
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

    return () => {
      window.removeEventListener("message", handleMessage);
      if (iframeRef.current) {
        iframeRef.current.removeEventListener("load", handleIframeLoad);
      }
    };
  }, []);

  return (
    <Skeleton isLoaded={isLoaded}>
      <iframe
        ref={iframeRef}
        srcDoc={isLoaded ? data.content : ""}
        style={{ width: "100%", height: iframeHeight, border: "none" }}
      />
    </Skeleton>
  );
}
