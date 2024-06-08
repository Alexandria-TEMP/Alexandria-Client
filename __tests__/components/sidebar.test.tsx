import Sidebar from "@/components/sidebar";
import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";

describe("Sidebar", () => {
  it("matches snapshot", () => {
    const { container } = render(
      <Sidebar
        title="Test sidebar"
        items={[
          { title: "First item", node: <p>First item</p> },
          { title: "Second item", node: <h2>Second item</h2> },
          { title: "Third item", node: <h4>One more</h4> },
        ]}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
