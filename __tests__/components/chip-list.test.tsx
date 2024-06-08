import ChipList from "@/components/chip-list";
import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";

describe("ChipList", () => {
  it("matches snapshot", () => {
    const { container } = render(
      <ChipList labels={["test1", "a", "b", "test2", "3", "0101"]} />,
    );
    expect(container).toMatchSnapshot();
  });
});
