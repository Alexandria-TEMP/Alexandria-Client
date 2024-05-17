import { NextRouter } from "next/router";

/**
 * Creates a jest mock of NextRouter. All its methods are also mocks.
 * See https://stackoverflow.com/a/70831613.
 *
 * @param router properties of the router which can be manually set
 * @returns mocked router
 */
export default function createMockRouter(
  router?: Partial<NextRouter>,
): NextRouter {
  return {
    basePath: "",
    pathname: "/",
    route: "/",
    query: {},
    asPath: "/",
    back: jest.fn(),
    beforePopState: jest.fn(),
    prefetch: jest.fn(),
    push: jest.fn(),
    reload: jest.fn(),
    replace: jest.fn(),
    forward: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
    isLocaleDomain: false,
    isReady: true,
    defaultLocale: "en",
    domainLocales: [],
    isPreview: false,
    ...router,
  };
}
