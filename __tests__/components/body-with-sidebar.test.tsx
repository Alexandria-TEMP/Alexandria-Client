import BodyWithSidebar from "@/components/body-with-sidebar";
import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";

describe("BodyWithSidebar", () => {
  it("matches snapshot", () => {
    const { container } = render(
      <BodyWithSidebar sidebar={<p>This will be to the right side</p>}>
        <p>This will be to the left side, and much bigger</p>{" "}
      </BodyWithSidebar>,
    );
    expect(container).toMatchSnapshot();
  });
});
