const { expect, describe, it } = require("@jest/globals");
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import InputCard from "@/newpost/components/input-card";
import { MultiSelectAutocomplete } from "@/newpost/components/multi-select-autocomplete";
import { Member } from "@/lib/api-types";
import exp from "constants";

const dumTitle = "Dummy title";
const dumDesc = "Dummy description";
let dumSelected = new Set<string>();
const dumItems = new Map<string, Member>([
    ["1", {
        id: "1",
        email: "mariecurie@tudelft.nl",
        firstName: "Marie",
        picture: "/placeholders/Marie_Curie.jpg",
        institution: "TU Delft",
        lastName: "Curie",
      }],
    ["2", {
      id: "2",
      email: "kopernicus@tudelft.nl",
      firstName: "Nicolaus",
      institution: "TU Delft",
      picture: "/placeholders/Nikolaus_Kopernikus.jpg",
      lastName: "Copernicus",
    }]
]);
const dumSetSelectedItems = jest.fn((item: Set<string>) => {});
const dumGetItemLabel = jest.fn((item: Member | undefined) => "Dummy name");
let multiSelect;

beforeEach(() => {
    dumSelected = new Set<string>();
    multiSelect = render(           
        <MultiSelectAutocomplete
            title={dumTitle}
            description={dumDesc}
            selected={dumSelected}
            items={dumItems}
            setSelectedItems={dumSetSelectedItems}
            getItemLabel={dumGetItemLabel}
        />
    )
})

describe("MultiSelectAutocomplete", () => {
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
        const msgElem = screen.getByText("No items selected yet");
        expect(msgElem).toBeInTheDocument();
    });

    it("renders the input prompt", () => {
        const inputElem = screen.getByPlaceholderText("Search..."); // TODO this is dumb cause it relies on hardcoded name but i do not know how else to get it
        expect(inputElem).toBeInTheDocument();
    });

    // it("renders the items", () => {
        // fireEvent.click(screen.getByPlaceholderText("Search...")); // TODO idk why this doesnt work?
        // fireEvent.click(screen.getByRole("button", {name: "Show suggestions"}));
        // const inputList = screen.getAllByRole("listitem", {hidden: true});
        // expect(inputList).toBeInTheDocument();
        // expect(inputList.length).toBe(dumItems.size);
    // });
});