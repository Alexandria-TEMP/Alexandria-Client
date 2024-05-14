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
  selected: Set<React.Key>; // TODO explain why this is a map
  items: Map<string, Type>;
  setSelectedItems: (item: Set<React.Key>) => void;
  getItemLabel: (i: Type | undefined) => string;
}) {
  const [newItem, setNewItem] = useState<React.Key>("");

  const removeItem = (removed: React.Key) =>
    setSelectedItems(
      new Set(Array.from(selected.keys()).filter((e) => e !== removed)),
    );

  return (
    <div className="space-y-2">
      <h2>{title}</h2>
      <div className="flex flex-row max-w-full flex-wrap gap-x-1.5 gap-y-2">
        {Array.from(selected.keys()).map((item) => (
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
            setSelectedItems(new Set([...Array.from(selected.keys()), newItem]))
          }
        >
          Add
        </Button>
      </div>
    </div>
  );
}
