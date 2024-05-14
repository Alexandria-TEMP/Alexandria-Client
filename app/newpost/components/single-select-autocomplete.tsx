"use client";

import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";

/**
 * Searchable dropdown with single select. Intended to be used when you want user to pick from small number of predetermined options.
 * Currently the first item in the "items" list is selected as the default
 * @param param0 prop obj where:
 * - title: the title of what the dropdown represents
 * - description: the description of what the dropdown represents
 * - placeholder: the placeholder text if any is wanted
 * - items: the list of items in the dropdown, just the names of them, keys are "generated" in the component
 * - setSelection: setter for the variable that stores the selected option; expected to come from React useState hook
 * @returns a div containing the title and the dropdown
 */
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
        defaultSelectedKey={"0"} // TODO should i have a default selected item?
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
