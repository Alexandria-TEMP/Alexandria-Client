import {
  render,
  screen,
  waitFor,
  within,
  fireEvent,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MultiSelectAutocomplete } from "@/components/form/multi-select-autocomplete";
import { Member } from "@/lib/api-types";
import { dummyMembers } from "~/__tests__/__utils__/dummys";
import { useForm, FormProvider, UseFormReturn } from "react-hook-form";
import { expect, describe, it } from "@jest/globals";

const dumTitle = "Dummy title";
const dumDesc = "Dummy description";
const dumItems = dummyMembers;
const dumGetItemLabel = jest.fn((item: Member | undefined) => "Dummy name");

const Wrapper = ({
  children,
  defaults,
}: {
  children: React.ReactNode;
  defaults: string[];
}) => {
  const methods = useForm({
    defaultValues: {
      dumItem: defaults,
    },
    mode: "onTouched",
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("MultiSelectAutocomplete", () => {
  beforeEach(async () => {
    await act(async () => {
      render(
        <Wrapper defaults={[]}>
          <MultiSelectAutocomplete
            label={dumTitle}
            description={dumDesc}
            name="dumItem"
            getItemLabel={dumGetItemLabel}
            optionsGetter={async () => dumItems}
          />
        </Wrapper>,
      );
    });
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

  it("renders the input prompt", () => {
    const inputElem = screen.getByTestId("select-element-test-id");
    expect(inputElem).toBeInTheDocument();
  });

  it("renders author tags", async () => {
    await act(async () => {
      render(
        <Wrapper defaults={["1"]}>
          <MultiSelectAutocomplete
            label={dumTitle}
            description={dumDesc}
            name="dumItem"
            getItemLabel={dumGetItemLabel}
            optionsGetter={async () => dumItems}
          />
        </Wrapper>,
      );
    });

    const tagElem = screen.getByTestId("chip-test-id");
    expect(tagElem).toBeInTheDocument();
  });

  // TODO fix this test
  //   it("removes author tags", async () => {
  //     render(
  //       <Wrapper defaults={["1"]}>
  //         <MultiSelectAutocomplete
  //           title={dumTitle}
  //           description={dumDesc}
  //           options={dumItems}
  //           name="dumItem"
  //           getItemLabel={dumGetItemLabel}
  //         />
  //       </Wrapper>,
  //     );

  //     const tagElem = screen.getByTestId("chip-test-id");
  //     const tagBtn = within(tagElem).getByRole("button");
  //     await userEvent.click(tagBtn);
  //   });

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
    expect(items.length).toBe(dumItems.length);
  });

  // TODO fix this test
  //   it("modifies selected list", async () => {
  //     const inputElem = screen.getByTestId("select-element-test-id");
  //     await userEvent.type(inputElem, "Marie"); // TODO idk why this doesnt work?

  //     // Wait for suggestions to appear
  //     await waitFor(() => {
  //       expect(
  //         screen.getAllByTestId("select-item-test-id")[0],
  //       ).toBeInTheDocument();
  //     });
  //     const selected = screen.getAllByTestId("select-item-test-id")[0];

  //     await userEvent.click(selected);
  //     await userEvent.click(screen.getByText("Add"));
  //   });

  it("doesnt show danger asterisk", () => {
    const asterskElem = screen.queryByText("*");
    expect(asterskElem).toBeNull();
  });
});

describe("MultiSelectAutocomplete that is Required", () => {
  it("shows danger asterisk", async () => {
    await act(async () => {
      render(
        <Wrapper defaults={[]}>
          <MultiSelectAutocomplete
            label={dumTitle}
            description={dumDesc}
            name="dumItem"
            getItemLabel={dumGetItemLabel}
            rules={{
              required: {
                value: true,
                message: "pls select",
              },
            }}
            optionsGetter={async () => dumItems}
          />
        </Wrapper>,
      );
    });

    const asterskElem = screen.getByText("*");
    expect(asterskElem).toBeInTheDocument();
  });

  it("diplays error message when emptied list", async () => {
    const { rerender } = await act(async () => {
      return render(
        <Wrapper defaults={["1"]}>
          <MultiSelectAutocomplete
            label={dumTitle}
            description={dumDesc}
            name="dumItem"
            getItemLabel={dumGetItemLabel}
            rules={{
              required: {
                value: true,
                message: "pls select",
              },
            }}
            optionsGetter={async () => dumItems}
          />
        </Wrapper>,
      );
    });

    const tagElem = screen.getByTestId("chip-test-id");
    const tagBtn = within(tagElem).getByRole("button");
    fireEvent.click(tagBtn);

    // Wait for error message to appear
    await waitFor(() => {
      expect(screen.getByText("pls select")).toBeInTheDocument();
    });
  });
});
