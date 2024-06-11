import { expect, describe, it } from "@jest/globals";
import { act, render, screen } from "@testing-library/react";
import { getRenderedVersion } from "@/lib/api-calls/version-api";
import { dummyHtml } from "~/__tests__/__utils__/dummys";
import VersionRender, {
  iframeTitle,
} from "@/post/[postId]/components/version-render/component";

jest.mock("@/lib/api-calls/version-api");

describe("VersionRender", () => {
  const setupGoodWeather = async () => {
    (getRenderedVersion as jest.Mock).mockResolvedValue(dummyHtml.html);

    // Disable reason: Need the async keyword for act to work properly
    // but render is not awaitable so eslint complains
    // eslint-disable-next-line @typescript-eslint/require-await
    const content = await act(async () => render(<VersionRender id="1" />));

    const iframe = content.getByTitle(iframeTitle) as HTMLIFrameElement;
    return { content, iframe };
  };

  const setupBadWeather = async () => {
    const errorMessage = "this is a test failure!";
    (getRenderedVersion as jest.Mock).mockRejectedValue(errorMessage);

    // Disable reason: Need the async keyword for act to work properly
    // but render is not awaitable so eslint complains
    // eslint-disable-next-line @typescript-eslint/require-await
    const content = await act(async () => render(<VersionRender id="1" />));

    const error = screen.getByTestId("render-error");
    return { errorMessage, content, error };
  };

  it("has html contents", async () => {
    const { iframe } = await setupGoodWeather();
    expect(iframe.srcdoc).toMatch(dummyHtml.html);
  });

  it("does not display error on success", async () => {
    await setupGoodWeather();
    expect(screen.queryByTestId("render-error")).not.toBeInTheDocument();
  });

  it("displays error component on error", async () => {
    const { error } = await setupBadWeather();
    expect(error).toBeInTheDocument();
  });

  it("does not display iframe on error", async () => {
    const { content } = await setupBadWeather();
    expect(content.queryByTitle(iframeTitle)).not.toBeInTheDocument();
  });
});