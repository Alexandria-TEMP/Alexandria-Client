"use client";

import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { useController, Control, Path, FieldValues } from "react-hook-form";
import { Key } from "react";

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
export function SingleSelectAutocomplete<FormType extends FieldValues>({
  title,
  description,
  placeholder,
  defaultSelectedKey,
  items,
  name,
  control,
  rules,
}: {
  title?: string;
  description?: string;
  placeholder?: string;
  defaultSelectedKey?: string;
  items: string[];
  control: Control<FormType>;
  name: Path<FormType>;
  rules?: {
    required?:
      | string
      | {
          value: boolean;
          message: string;
        };
    validate?: (value: string[]) => boolean | string;
  };
}) {
  const { field, fieldState } = useController({
    name,
    control,
    rules,
  });

  // TODO is it worth keeping this component just for the key methods?
  // I cannot set the item itself as key because that will cause so many rerenders that it breaks react
  // I could technically look for indexOf each, but I think that would be less efficient
  const keys = Array.from(Array(items.length).keys());
  const values = new Map(keys.map((k) => [k.toString(), items[k]]));

  const handleOnChange = (k: Key | null) => {
    if (k !== null && values.has(k.toString())) {
      field.onChange(values.get(k.toString())!);
      field.onBlur();
    }
  };

  return (
    <div className="space-y-2">
      <Autocomplete
        label={<h2 className="max-w-fit inline-block"> {title} </h2>}
        labelPlacement="outside"
        description={description}
        placeholder={placeholder}
        className="max-w-full"
        onSelectionChange={(k) => handleOnChange(k)}
        data-testid="select-element-test-id"
        isInvalid={!!fieldState.error?.message}
        errorMessage={fieldState.error?.message?.toString()}
        onBlur={() => field.onBlur()}
        value={field.value}
        defaultSelectedKey={defaultSelectedKey}
        isRequired={!!rules?.required}
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
