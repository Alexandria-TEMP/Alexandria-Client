import { expect, describe, it } from "@jest/globals";
import "@testing-library/jest-dom";
import {
  render,
  screen,
  waitFor,
  cleanup,
  within,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MultiSelectAutocomplete } from "@/components/multi-select-autocomplete";
import { Member } from "@/lib/api-types";

const dumTitle = "Dummy title";
const dumDesc = "Dummy description";
let dumSelected = new Set<string>();
const dumItems = new Map<string, Member>([
  [
    "1",
    {
      id: "1",
      email: "mariecurie@tudelft.nl",
      firstName: "Marie",
      picture: "/placeholders/Marie_Curie.jpg",
      institution: "TU Delft",
      lastName: "Curie",
    },
  ],
  [
    "2",
    {
      id: "2",
      email: "kopernicus@tudelft.nl",
      firstName: "Nicolaus",
      institution: "TU Delft",
      picture: "/placeholders/Nikolaus_Kopernikus.jpg",
      lastName: "Copernicus",
    },
  ],
]);
const dumSetSelectedItems = jest.fn(); // TODO hardcoded cause i cant inject newItem
const dumGetItemLabel = jest.fn((item: Member | undefined) => "Dummy name");
let multiSelect;

describe("MultiSelectAutocomplete", () => {
  beforeEach(() => {
    dumSelected = new Set<string>();
    dumSetSelectedItems.mockImplementation(
      (item: Set<string>) => (dumSelected = dumSelected.add("1")),
    );
    multiSelect = render(
      <MultiSelectAutocomplete
        title={dumTitle}
        description={dumDesc}
        selected={dumSelected}
        items={dumItems}
        setSelectedItems={dumSetSelectedItems}
        getItemLabel={dumGetItemLabel}
      />,
    );
  });

  it("renders the title", () => {
    const titleElem = screen.getByText(dumTitle);
    expect(titleElem).toBeInTheDocument();
  });

  it("renders the description", () => {
    const descElem = screen.getByText(dumDesc);
    expect(descElem).toBeInTheDocument();
  });

  it("renders the add button", () => {
    const addBtn = screen.getByText("Add");
    expect(addBtn).toBeInTheDocument();
  });

  it("displays empty message when nothing selected", () => {
    const msgElem = screen.getByTestId("no-item");
    expect(msgElem).toBeInTheDocument();
  });

  it("renders the input prompt", () => {
    const inputElem = screen.getByTestId("select-element-test-id");
    expect(inputElem).toBeInTheDocument();
  });

  it("renders author tags", () => {
    dumSelected = new Set<string>("1");
    multiSelect = render(
      <MultiSelectAutocomplete
        title={dumTitle}
        description={dumDesc}
        selected={dumSelected}
        items={dumItems}
        setSelectedItems={dumSetSelectedItems}
        getItemLabel={dumGetItemLabel}
      />,
    );

    const tagElem = screen.getByTestId("chip-test-id");
    expect(tagElem).toBeInTheDocument();
  });

  it("removes author tags", async () => {
    dumSelected = new Set<string>("1");
    multiSelect = render(
      <MultiSelectAutocomplete
        title={dumTitle}
        description={dumDesc}
        selected={dumSelected}
        items={dumItems}
        setSelectedItems={dumSetSelectedItems}
        getItemLabel={dumGetItemLabel}
      />,
    );

    const tagElem = screen.getByTestId("chip-test-id");
    const tagBtn = within(tagElem).getByRole("button");
    await userEvent.click(tagBtn);
    expect(dumSetSelectedItems).toHaveBeenCalledTimes(1);
  });

  it("renders the items", async () => {
    const inputElem = screen.getByTestId("select-element-test-id");
    await userEvent.type(inputElem, "Marie"); // TODO idk why this doesnt work?

    // Wait for suggestions to appear
    await waitFor(() => {
      expect(
        screen.getAllByTestId("select-item-test-id")[0],
      ).toBeInTheDocument();
    });

    const items = screen.getAllByTestId("select-item-test-id");
    expect(items.length).toBe(dumItems.size);
  });

  it("modifies selected list", async () => {
    const inputElem = screen.getByTestId("select-element-test-id");
    await userEvent.type(inputElem, "Marie"); // TODO idk why this doesnt work?

    // Wait for suggestions to appear
    await waitFor(() => {
      expect(
        screen.getAllByTestId("select-item-test-id")[0],
      ).toBeInTheDocument();
    });
    const selected = screen.getAllByTestId("select-item-test-id")[0];

    await userEvent.click(selected);
    await userEvent.click(screen.getByText("Add"));
    expect(dumSetSelectedItems).toHaveBeenCalledTimes(1);
  });

  it("doesnt show danger asterisk", () => {
    const asterskElem = screen.queryByText("*");
    expect(asterskElem).toBeNull();
  });
});

describe("MultiSelectAutocomplete that is Required", () => {
  it("shows danger asterisk", () => {
    dumSelected = new Set<string>();
    multiSelect = render(
      <MultiSelectAutocomplete
        title={dumTitle}
        description={dumDesc}
        isRequired={true}
        selected={dumSelected}
        items={dumItems}
        setSelectedItems={dumSetSelectedItems}
        getItemLabel={dumGetItemLabel}
      />,
    );

    const asterskElem = screen.getByText("*");
    expect(asterskElem).toBeInTheDocument();
  });

  it("diplays error message when emptied list", async () => {
    dumSelected = new Set<string>("1");
    dumSetSelectedItems.mockImplementation(
      (i: Set<string>) => (dumSelected = i),
    );
    const { rerender } = render(
      <MultiSelectAutocomplete
        title={dumTitle}
        description={dumDesc}
        isRequired={true}
        selected={dumSelected}
        items={dumItems}
        setSelectedItems={dumSetSelectedItems}
        getItemLabel={dumGetItemLabel}
      />,
    );

    const tagElem = screen.getByTestId("chip-test-id");
    const tagBtn = within(tagElem).getByRole("button");
    fireEvent.click(tagBtn);

    dumSetSelectedItems.mockImplementation((items: Set<string>) => {
      rerender(
        <MultiSelectAutocomplete
          title={dumTitle}
          description={dumDesc}
          isRequired={true}
          selected={dumSelected}
          items={dumItems}
          setSelectedItems={dumSetSelectedItems}
          getItemLabel={dumGetItemLabel}
        />,
      );
    });

    fireEvent.click(tagBtn);

    // Wait for error message to appear
    await waitFor(() => {
      expect(screen.getByTestId("pls-select")).toBeInTheDocument();
    });
  });
});
