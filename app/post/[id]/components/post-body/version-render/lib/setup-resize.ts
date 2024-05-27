import React from "react";

export function setupResize(
  iframeRef: React.RefObject<HTMLIFrameElement>,
  setIframeHeight: React.Dispatch<React.SetStateAction<number>>,
) {
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
}
