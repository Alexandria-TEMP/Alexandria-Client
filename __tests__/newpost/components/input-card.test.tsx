const { expect, describe, it } = require("@jest/globals");
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import InputCard from "@/newpost/components/input-card";

describe("InputCard", () => {
    it("shows correct title", () => {
        const dumTitle = "Dummy title";
        const dumPlaceholder = "Dummy placeholder";
        const dumSetter = (item: string) => {}

        render(InputCard({title: dumTitle, placeholder: dumPlaceholder, setValue: dumSetter}));

        const titleElem = screen.getByText(dumTitle);
        expect(titleElem).toBeInTheDocument();
    })

    it("shows correct placeholder text", () => {
        const dumTitle = "Dummy title";
        const dumPlaceholder = "Dummy placeholder";
        const dumSetter = () => {}

        render(InputCard({title: dumTitle, placeholder: dumPlaceholder, setValue: dumSetter}));

        const placeholderElem = screen.getByPlaceholderText(dumPlaceholder);
        expect(placeholderElem).toBeInTheDocument();
    })

    it("contains an input field", () => {
        const dumTitle = "Dummy title";
        const dumPlaceholder = "Dummy placeholder";
        const dumSetter = () => {}

        render(InputCard({title: dumTitle, placeholder: dumPlaceholder, setValue: dumSetter}));

        const inputElem = screen.getByRole("textbox")
        expect(inputElem).toBeInTheDocument();
    })

    it("calls the setter", () => {
        const dumTitle = "Dummy title";
        const dumPlaceholder = "Dummy placeholder";
        const dumSetter = jest.fn(() => {});

        render(InputCard({title: dumTitle, placeholder: dumPlaceholder, setValue: dumSetter}));
        fireEvent.change(screen.getByPlaceholderText(dumPlaceholder), {target: {value: "changed"}});

        expect(dumSetter).toHaveBeenCalledTimes(1);
    })
})