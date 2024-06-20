import { render } from "@testing-library/react";
import { expect, describe, it } from "@jest/globals";
import HomeSidebar from "@/(home)/components/home-sidebar";

describe("HomeSidebar", () => {
  it("matches snapshot", () => {
    const { container } = render(<HomeSidebar />);
    expect(container).toMatchSnapshot();
  });
});
