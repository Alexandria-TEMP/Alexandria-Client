"use client";

import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";

/**
 * Searchable dropdown with single select. Intended to be used when you want user to pick from small number of predetermined options.
 * Currently the first item in the "items" list is selected as the default
 * @param param0 prop obj where:
 * - title: the title of what the dropdown represents
 * - description: the description of what the dropdown represents
 * - placeholder: the placeholder text if any is wanted
 * - defaultSelectedKey: string representing the array index in "items" of the default value
 * - items: the list of items in the dropdown, just the names of them, keys are "generated" in the component
 * - setSelection: setter for the variable that stores the selected option; expected to come from React useState hook
 * @returns a div containing the title and the dropdown
 */
export function SingleSelectAutocomplete({
  title,
  description,
  placeholder,
  defaultSelectedKey,
  items,
  setSelection,
}: {
  title: string;
  description: string;
  placeholder: string;
  defaultSelectedKey?: string;
  items: string[];
  setSelection: (item: string | undefined) => void;
}) {
  // TODO is it worth keeping this component just for the key methods?
  const keys = Array.from(Array(items.length).keys());
  const values = new Map(keys.map((k) => [k.toString(), items[k]]));

  return (
    <div className="space-y-2">
      <Autocomplete
        label={<h2 className="max-w-fit inline-block"> {title} </h2>}
        labelPlacement="outside"
        description={description}
        placeholder={placeholder}
        className="max-w-full"
        defaultSelectedKey={defaultSelectedKey}
        isRequired
        onSelectionChange={(k) =>
          k !== null &&
          values.has(k.toString()) &&
          setSelection(values.get(k.toString()))
        }
        data-testid="select-element-test-id"
      >
        {keys.map((key) => (
          <AutocompleteItem
            key={key.toString()}
            data-testid="select-item-test-id"
          >
            {values.get(key.toString())}
          </AutocompleteItem>
        ))}
      </Autocomplete>
    </div>
  );
}
