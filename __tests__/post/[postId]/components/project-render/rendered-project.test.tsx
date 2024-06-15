import { expect, describe, it } from "@jest/globals";
import { act, render, screen } from "@testing-library/react";
import { useRender } from "@/lib/api/hooks/quarto-hooks";
import { dummyHtml } from "~/__tests__/__utils__/dummys";
import RenderedQuarto, {
  iframeTitle,
} from "@/post/[postId]/components/render/rendered-quarto";

jest.mock("@/lib/api/hooks/quarto-hooks");

describe("RenderedQuarto", () => {
  const setupGoodWeather = async () => {
    (useRender as jest.Mock).mockReturnValue({
      data: dummyHtml.html,
      error: undefined,
      isPending: false,
      isLoading: false,
    });

    // Disable reason: Need the async keyword for act to work properly
    // but render is not awaitable so eslint complains
    // eslint-disable-next-line @typescript-eslint/require-await
    const content = await act(async () =>
      render(<RenderedQuarto id={1} container="branch" />),
    );

    const iframe = content.getByTitle(iframeTitle) as HTMLIFrameElement;
    return { content, iframe };
  };

  const setupBadWeather = async () => {
    const errorMessage = "this is a test failure!";
    (useRender as jest.Mock).mockReturnValue({
      data: undefined,
      error: errorMessage,
      isPending: false,
      isLoading: false,
    });

    // Disable reason: Need the async keyword for act to work properly
    // but render is not awaitable so eslint complains
    // eslint-disable-next-line @typescript-eslint/require-await
    const content = await act(async () =>
      render(<RenderedQuarto id={1} container="branch" />),
    );

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
