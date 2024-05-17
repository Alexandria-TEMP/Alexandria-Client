"use client";

import { useState } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";

/**
 * Searchable dropdown which mimics multi select by adding the selected items to a list of removable tags.
 * @param param0 prop obj where:
 * - title: the title of what the dropdown represents
 * - description: the description of what the dropdown represents
 * - isRequired: whether this list contain at least one element
 * - selected: Set of the selected items (should not have duplicates), must come from useState hook from the parent
 * - items: the list of items in the dropdown, needs to be a key-value pair, the key is what is used for selected items
 * - setSelectedItems: setter for "selected", must come from useState hook
 * - getItemLabel: method that returns the desired string representation of the object in the dropdown
 * @returns a div containing the title, list of selected items, the dropdown and add button
 */
export function MultiSelectAutocomplete<Type>({
  title,
  description,
  isRequired = false,
  selected,
  items,
  setSelectedItems,
  getItemLabel,
}: {
  title: string;
  description: string;
  isRequired?: boolean;
  selected: Set<string>;
  items: Map<string, Type>;
  setSelectedItems: (item: Set<string>) => void;
  getItemLabel: (i: Type | undefined) => string;
}) {
  const [newItem, setNewItem] = useState<React.Key>("");
  // TODO not sure how to better do this, basically i need this to do client side validation
  // to check if the user has selected some authors
  const [isFirst, setIsFirst] = useState(true);
  const isInvalid = () => isRequired && !isFirst && selected.size <= 0;

  const removeItem = (removed: string) =>
    setSelectedItems(
      new Set(Array.from(selected.keys()).filter((e) => e !== removed)),
    );

  return (
    <div className="space-y-2" data-testid="mutliselect-test-id">
      <span>
        {/* TODO refactor this? */}
        <h2
          className={isInvalid() ? "inline-block text-danger" : "inline-block"}
        >
          {title}
        </h2>
        {isRequired && (
          <h2 className="inline-block text-danger text-small">*</h2>
        )}
      </span>
      <div className="flex flex-row max-w-full flex-wrap gap-x-1.5 gap-y-2">
        {
          selected.size > 0 ? (
            Array.from(selected.keys()).map((item) => (
              <Chip
                variant="bordered"
                key={item}
                onClose={(e) => removeItem(item)}
                data-testid="chip-test-id"
              >
                {/* // TODO this is super inefficient but idk how to do this better
                            // cause i cannot directly store the object from the autocomplete component, i can only get keys */}
                {getItemLabel(items.get(item.toString()))}
              </Chip>
            ))
          ) : isFirst || !isRequired ? (
            <div data-testid="no-item"> No items selected yet. </div>
          ) : (
            <div className="text-danger" data-testid="pls-select">
              {" "}
              Please select at least one item.
            </div>
          ) // TODO would make this prettier
        }
      </div>
      <div className="flex flex-row justify-between gap-x-3">
        <Autocomplete
          defaultItems={items.entries()}
          placeholder="Search..."
          description={description}
          style={{ display: "inline-block" }}
          onSelectionChange={(k) => k !== null && k != "" && setNewItem(k)}
          data-testid="select-element-test-id"
          isInvalid={isInvalid()}
          onInputChange={(s) => s == "" && setNewItem("")}
        >
          {(item) => (
            <AutocompleteItem key={item[0]} data-testid="select-item-test-id">
              {getItemLabel(item[1])}
            </AutocompleteItem>
          )}
        </Autocomplete>
        <Button
          variant="ghost"
          style={{ display: "inline-block" }}
          onClick={(e) => {
            if (newItem !== "") {
              setIsFirst(false);
              setSelectedItems(
                new Set([...Array.from(selected.keys()), newItem.toString()]),
              );
            }
          }}
        >
          Add
        </Button>
      </div>
    </div>
  );
}
