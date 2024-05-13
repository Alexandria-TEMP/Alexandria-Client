"use client";

import { useState } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";

export function SingleSelectAutocomplete({
  title,
  description,
  placeholder,
  items,
  setSelection,
}: {
  title: string;
  description: string;
  placeholder: string;
  items: string[];
  setSelection: (item: string) => void;
}) {
  const keys = Array.from(Array(items.length).keys());
  const values = new Map(keys.map((k) => [k.toString(), items[k]]));

  return (
    <div className="space-y-2">
      <h2> {title} </h2>
      <Autocomplete
        description={description}
        placeholder={placeholder}
        className="max-w-full"
        defaultSelectedKey={"0"}
        isRequired={true}
        // TODO this component is meant to be used for things with a small, predetermined number of options
        // is it cool if i just send the value of the slection as a string?
        onSelectionChange={(k) =>
          k !== null &&
          values.has(k.toString()) &&
          setSelection(values.get(k.toString())!)
        }
      >
        {keys.map((key) => (
          <AutocompleteItem key={key.toString()}>
            {values.get(key.toString())}
          </AutocompleteItem>
        ))}
      </Autocomplete>
    </div>
  );
}
