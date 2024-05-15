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
 * - selected: Set of the selected items (should not have duplicates), must come from useState hook from the parent
 * - items: the list of items in the dropdown, needs to be a key-value pair, the key is what is used for selected items
 * - setSelectedItems: setter for "selected", must come from useState hook
 * - getItemLabel: method that returns the desired string representation of the object in the dropdown
 * @returns a div containing the title, list of selected items, the dropdown and add button
 */
export function MultiSelectAutocomplete<Type>({
  title,
  description, // TODO if wanted, i could add placeholders and many other things but for no i think is overkill
  selected,
  items,
  setSelectedItems,
  getItemLabel,
}: {
  title: string;
  description: string;
  selected: Set<string>;
  items: Map<string, Type>;
  setSelectedItems: (item: Set<string>) => void;
  getItemLabel: (i: Type | undefined) => string;
}) {
  const [newItem, setNewItem] = useState<React.Key>("");

  const removeItem = (removed: string) =>
    setSelectedItems(
      new Set(Array.from(selected.keys()).filter((e) => e !== removed)),
    );

  return (
    <div className="space-y-2" data-testid="mutliselect-test-id">
      <h2>{title}</h2>
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
          ) : (
            <div> No items selected yet </div>
          ) // TODO would make this prettier
        }
      </div>
      <div className="flex flex-row justify-between gap-x-3">
        <Autocomplete
          defaultItems={items.entries()}
          labelPlacement="outside"
          placeholder="Search..."
          description={description}
          style={{ display: "inline-block" }}
          isRequired={true}
          onSelectionChange={(k) => k !== null && setNewItem(k)}
          data-testid="select-element-test-id"
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
          onClick={(e) =>
            setSelectedItems(
              new Set([...Array.from(selected.keys()), newItem.toString()]),
            )
          }
        >
          Add
        </Button>
      </div>
    </div>
  );
}
