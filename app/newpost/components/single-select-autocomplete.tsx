"use client";

import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { useController, FieldValues } from "react-hook-form";
import { Key } from "react";
import { CustomAutocompleteProps } from "@/lib/types/custom-autocomplete-types";

/**
 * Searchable dropdown with single select (can select only one item). Intended to be used when you want user to pick from small number of predetermined options.
 * As a field of a form, this represents a string
 * so this component DOES NOT store keys in the form, it stores the string itself
 * Should be a child of a form that uses react-hook-form
 * See `component-types.d.ts` for documentation on prop types and fields, additionally:
 * @param options a list of strings which represent the items themselves
 * @param rules IMPORTANT necessary for form validation, howver custom error messages set by rules do not work at the moment
 * @returns a div containing the title and the dropdown
 */
export function SingleSelectAutocomplete<FormType extends FieldValues>({
  label,
  description,
  placeholder,
  defaultSelectedKey,
  options,
  name,
  control,
  rules,
}: CustomAutocompleteProps<string, string[], string, FormType>) {
  /* Register the field as part of the parent form using appropriate name and rules  */
  const { field } = useController({
    name,
    control,
    rules,
  });

  /**
   * Zip the array of items with their indices for efficiency:
   * - we need keys for the items, but if I just set the item (string) as the key, this breaks react for some reason
   *   (it causes too many rerenders)
   * - i could use the index of the item in the array of options by using options.indexOf(item) each time
   *   but it would be more inefficient to search the array each time you need to rerender
   */
  const keys = Array.from(Array(options.length).keys());
  const values = new Map(keys.map((k) => [k.toString(), options[k]]));

  /**
   * Method that updates the form field when an element is selected
   * Before updating, it makes sure that the element is actually one of the options,
   * and not something that the user typed
   * @param k the key (index) of the item that is selected, or null if the item is not in the options
   */
  const handleOnChange = (k: Key | null) => {
    if (k !== null && values.has(k.toString())) {
      field.onChange(values.get(k.toString())!);
      field.onBlur(); /* notifies the form hook that the field has been changed */
    }
  };

  return (
    <div className="space-y-2">
      <Autocomplete
        label={
          <span aria-label={name} className="max-w-fit inline-block">
            {label}
          </span>
        }
        labelPlacement="outside"
        description={description}
        placeholder={placeholder}
        className="max-w-full"
        onSelectionChange={(k) => handleOnChange(k)}
        data-testid="select-element-test-id"
        onBlur={() => field.onBlur()}
        value={field.value}
        defaultSelectedKey={defaultSelectedKey}
        isRequired={
          !!rules?.required
        } /* using build in NextUI isRequired option to display error */
        aria-labelledby={name}
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
