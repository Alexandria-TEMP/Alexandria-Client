"use client";

import { useState } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";

export function MultiSelectAutocomplete<Type>({
  title,
  description,
  selected,
  items,
  setSelectedItems,
  getItemLabel,
}: {
  title: string;
  description: string;
  selected: string[];
  items: Map<string, Type>;
  setSelectedItems: (item: string[]) => void;
  getItemLabel: (i: Type | undefined) => string;
}) {
  const [newItem, setNewItem] = useState<React.Key>("");

  const removeItem = (removed: string) =>
    setSelectedItems(selected.filter((a) => a !== removed));

  return (
    <div className="space-y-2">
      <h2>{title}</h2>
      <div className="flex flex-row max-w-full flex-wrap gap-x-1.5 gap-y-2">
        {selected.map((item) => (
          <Chip variant="bordered" key={item} onClose={(e) => removeItem(item)}>
            {/* // TODO this is super inefficient but idk how to do this better
                        // cause i cannot directly store the object from the autocomplete component, i can only get keys */}
            {getItemLabel(items.get(item.toString()))}
          </Chip>
        ))}
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
        >
          {(item) => (
            <AutocompleteItem key={item[0]}>
              {getItemLabel(item[1])}
            </AutocompleteItem>
          )}
        </Autocomplete>
        <Button
          variant="ghost"
          style={{ display: "inline-block" }}
          onClick={(e) =>
            // TODO currently you are allowed to add the same author mutliple times (which should not be the case)
            // this causes "funny" issue when deleting the author, as in it removes all instances of the author
            // with the same id
            // if you are curious what i mean, just choose an author, press the add button multiple times,
            // and them press delete on one of the authors
            // ANOTHER BIGGER ISSUE if you add A, then say B, and then A again (you have A, B, A)
            // and you try to remove the first A, then you have problems
            setSelectedItems([...selected, newItem.toString()])
          }
        >
          Add
        </Button>
      </div>
    </div>
  );
}
