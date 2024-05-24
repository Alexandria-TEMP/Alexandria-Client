import { expect, describe, it } from "@jest/globals";
import "@testing-library/jest-dom";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SingleSelectAutocomplete } from "@/newpost/components/single-select-autocomplete";
import { FormProvider, useForm } from "react-hook-form";

const dumTitle = "Dummy title";
const dumDesc = "Dummy description";
const dumPlaceholder = "Dummy placeholder";
const dumItems = ["1", "2", "3"];

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm({
    defaultValues: {
      dumItem: "",
    },
    mode: "onTouched",
  });

  return (
    <FormProvider aria-label="Form" {...methods}>
      {children}
    </FormProvider>
  );
};

beforeEach(() => {
  render(
    <Wrapper>
      <SingleSelectAutocomplete
        title={dumTitle}
        description={dumDesc}
        placeholder={dumPlaceholder}
        items={dumItems}
        name="dumItem"
        rules={{
          required: {
            value: true,
            message: "Please select",
          },
        }}
      />
    </Wrapper>,
  );
});

afterEach(cleanup);

describe("MultiSelectAutocomplete", () => {
  it("renders the title", () => {
    const titleElem = screen.getByText(dumTitle);
    expect(titleElem).toBeInTheDocument();
  });

  it("renders the description", () => {
    const descElem = screen.getByText(dumDesc);
    expect(descElem).toBeInTheDocument();
  });

  it("renders the placeholder", () => {
    const placeholderElem = screen.getByPlaceholderText(dumPlaceholder);
    expect(placeholderElem).toBeInTheDocument();
  });

  it("renders the input prompt", () => {
    const inputElem = screen.getByTestId("select-element-test-id");
    expect(inputElem).toBeInTheDocument();
  });

  it("renders the items", async () => {
    const inputElem = screen.getByTestId("select-element-test-id");
    await userEvent.click(inputElem);

    // Wait for suggestions to appear
    await waitFor(() => {
      expect(
        screen.getAllByTestId("select-item-test-id")[0],
      ).toBeInTheDocument();
    });

    // TODO for some reason it says it only renders one item??
    const items = screen.getAllByTestId("select-item-test-id");
    expect(items.length).toBe(dumItems.length);
  });

  it("modifies selected list", async () => {
    const inputElem = screen.getByTestId("select-element-test-id");
    await userEvent.click(inputElem);

    // Wait for suggestions to appear
    await waitFor(() => {
      expect(
        screen.getAllByTestId("select-item-test-id")[0],
      ).toBeInTheDocument();
    });
    const selected = screen.getAllByTestId("select-item-test-id")[0]; // for some reason the first element in this list, is the last element in the actual top-down list

    await userEvent.click(selected);
    await waitFor(() => {
      expect(screen.getByDisplayValue(dumItems[2])).toBeInTheDocument(); // so this check is kind of stupid
    });
  });
});
