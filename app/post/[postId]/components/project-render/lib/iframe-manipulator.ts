import React from "react";

/**
 * Gets iframe.contentDocument, throwing errors if any of
 * iframe, iframe.contentWindow or iframe.contentDocument
 * are undefined.
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
 * @param iframeRef useRef to iframe
 * @param colors desired colors for html
 * @returns cleanup function
 */
export function changeColors(
  iframeRef: React.RefObject<HTMLIFrameElement>,
  colors: {
    background: string;
    text: string;
    codeBackground: string;
    codeText: string;
  },
) {
  const iframe = iframeRef.current; // Shorter name

  // When iframe loads, go into html body and to change its style
  const handleIframeLoad = () => {
    const document = getIframeDocument(iframe);

    // Set overall background and text color
    document.body.style.backgroundColor = colors.background;
    document.body.style.color = colors.text;

    // Create CSS rules for code blocks
    const insertedCss = [
      // Inline code snippets
      `code { 
        background-color: ${colors.codeBackground} !important;
        color: ${colors.codeText} !important;
      }`,
      // Code blocks
      `.sourceCode {
        background-color: ${colors.codeBackground} !important;
        color: ${colors.codeText} !important;
      }`,
      // Text within code blocks
      `.sourceCode > span > span {
        color: ${colors.codeText} !important;
      }`,
    ];

    // Inject these rules in the document style sheets

    // Create new style sheet
    if (!document.defaultView) return;
    const styleSheet = new document.defaultView.CSSStyleSheet();
    // Add rules to style sheet
    insertedCss.forEach((rule) =>
      styleSheet.insertRule(rule, styleSheet.cssRules.length),
    );
    // Append stylesheet to document
    document.adoptedStyleSheets = [
      ...(document.adoptedStyleSheets ?? []),
      styleSheet,
    ];
  };

  // Cleanup function to reset style sheets to original
  const originalStyleSheets = document.adoptedStyleSheets;
  const cleanupCss = () => {
    document.adoptedStyleSheets = originalStyleSheets;
  };

  if (iframe) {
    // Add a listener to actually inject when it loads
    iframe.addEventListener("load", handleIframeLoad);
    // Or just call it if it already loaded
    if (iframe.contentDocument?.readyState === "complete") {
      handleIframeLoad();
    }
  }

  return cleanupCss;
}
