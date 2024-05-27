import React from "react";

/**
 * Gets iframe.contentDocument, throwing errors if any of
 * iframe, iframe.contentWindow or iframe.contentDocument
 * are undefined.
 *
 * @param iframe reference to iframe
 * @returns iframe.contentDocument
 */
function getIframeDocument(iframe: HTMLIFrameElement | null) {
  if (!iframe) throw Error("iframe is undefined");
  if (!iframe.contentWindow) throw Error("iframe contentWindow is undefined");

  const iframeDocument = iframe.contentDocument;

  if (!iframeDocument) throw Error("iframe contentDocument is undefined");
  return iframeDocument;
}

/**
 * Creates a <script> tag at the end of the given document with
 * arbitrary javascript code.
 *
 * @param iframeDocument reference to html document
 * @param script javascript code to be injected in the document
 */
function injectScript(iframeDocument: Document, script: string) {
  // Creates a <script> tag
  const tag = iframeDocument.createElement("script");
  // Set content of <script> to the given script
  tag.textContent = script;
  // Inject the script in the html
  iframeDocument.body.appendChild(tag);
}

/**
 * Sets it up so after html is loaded, it's height is saved
 * in a useState state variable.
 *
 * @export
 * @param iframeRef useRef to iframe
 * @param setIframeHeight useState setter for iframe height
 * @returns cleanup function
 */
export function setupResize(
  iframeRef: React.RefObject<HTMLIFrameElement>,
  setIframeHeight: React.Dispatch<React.SetStateAction<number>>,
) {
  const iframe = iframeRef.current; // Shorter name

  // First: make it so html sends a message to its parent window with its height

  // When iframe loads, inject script into html to make it send the desired message
  const handleIframeLoad = () => {
    // Sends message with scrollHeight
    const script = `
      (function() {
        function sendHeight() {
            const height = document.documentElement.scrollHeight;
            window.parent.postMessage({ height: height }, '*');
          }
          sendHeight();
          window.addEventListener('resize', sendHeight);
        })();
        `;
    injectScript(getIframeDocument(iframe), script);
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

/**
 * Changes the style of html in given iframe.
 *
 * @export
 * @param iframeRef useRef to iframe
 * @param colors desired colors for html
 */
export function changeColors(
  iframeRef: React.RefObject<HTMLIFrameElement>,
  colors: { background: string; text: string },
) {
  const iframe = iframeRef.current; // Shorter name

  // When iframe loads, go into html body and to change its style
  const handleIframeLoad = () => {
    getIframeDocument(iframe).body.style.backgroundColor = colors.background;
    getIframeDocument(iframe).body.style.color = colors.text;
  };

  if (iframe) {
    // Add a listener to actually inject when it loads
    iframe.addEventListener("load", handleIframeLoad);
    // Or just call it if it already loaded
    if (iframe.contentDocument?.readyState === "complete") {
      handleIframeLoad();
    }
  }
}
