"use client";

import { useState } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { FieldValues, useController } from "react-hook-form";
import { CustomAutocompleteProps } from "@/lib/types/custom-autocomplete-types";

/**
 * Searchable dropdown which mimics multi select by adding the selected items to a list of removable tags.
 * As a field of a form, this corresponds to an array of item keys (strings in this case)
 * Should be a child of a form that uses react-hook-form
 * See `component-types.d.ts` for documentation on prop types and fields, additionally:
 * @param options: the list of items in the dropdown, needs to be a key-value pair, the key is what is used for selected items
 *                 it is expected that they key is a string
 * @returns a div containing the title, list of selected items, the dropdown and add button
 */
export function MultiSelectAutocomplete<
  Type,
  KeyType,
  FormType extends FieldValues,
>({
  label: title,
  description,
  placeholder = "Search...",
  options,
  control,
  name,
  rules,
  getItemLabel = () => "No getItemLabel function provided",
}: CustomAutocompleteProps<Type, Map<string, Type>, KeyType, FormType>) {
  /* Register the field as part of the parent form using appropriate name and rules  */
  const { field, fieldState } = useController({
    name,
    control,
    rules,
  });

  /* State variables used to modify the UI to display the list of selected items
   *  Even though the items are already stored within the form under field.value, I still need to create a semi-redundant items
   *  array using useState, since typescript is not aware of the fact that field.value is supposed to be an array in this case
   *  and I need to access array methods to display the values
   */
  const [newItem, setNewItem] = useState<React.Key>("");
  // disable reason: the type of "field.value" is not something i have acess to
  // if used component is correctly, it should correspond to the type of the keys aka string by default
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const [items, setItems] = useState<string[]>(field.value);

  /**
   * Method for removing an item from the item list,
   * updates both the items array used for displaying, and the field.value which stores the answer to the form
   * Uses set functionality to ensure there are no duplicates
   * @param removed the key of the item to be removed
   */
  const handleRemoveItem = (removed: string) => {
    const newItems = Array.from(new Set(items.filter((e) => e !== removed)));
    setItems(newItems);
    field.onChange(newItems);
    field.onBlur(); /* Make sure the form hook knows the field value has been changed */
  };

  /**
   * Method that handles adding a new item to the list
   * updates both the items array used for displaying, and the field.value which stores the answer to the form
   * Uses set functionality to ensure there are no duplicates
   */
  const handleAddItem = (added: string) => {
    if (newItem !== "") {
      const newItems = Array.from(new Set([...items, added]));
      setItems(newItems);
      field.onChange(newItems);
      field.onBlur(); /* Make sure the form hook knows the field value has been changed */
    }
  };

  return (
    <div className="space-y-2" data-testid="mutliselect-test-id">
      <span>
        {/* title of the field, if it is does not satisfy form validation conditions it will be colored as an error */}
        <span
          aria-label={name}
          className={"inline-block".concat(
            !fieldState.error ? "" : " text-danger",
          )}
        >
          {title}
        </span>
        {/* if the input the component is required, display required asterisk */}
        {rules?.required && (
          <span className="inline-block text-danger text-small">*</span>
        )}
      </span>
      <div className="flex flex-row max-w-full flex-wrap gap-x-1.5 gap-y-2">
        {items.map((item) => (
          <Chip
            variant="bordered"
            key={item}
            onClose={() => handleRemoveItem(item)}
            data-testid="chip-test-id"
          >
            {/* // TODO this is super inefficient but idk how to do this better
                            // cause i cannot directly store the object from the autocomplete component, i can only get keys
                            // i also cannot make the labels the keys because that breaks react for some reason */}
            {getItemLabel(options.get(item))}
          </Chip>
        ))}
      </div>
      <div className="flex flex-row justify-between gap-x-3">
        {/* The actual autocomplete component */}
        <Autocomplete
          defaultItems={options.entries()}
          placeholder={placeholder}
          description={description}
          style={{ display: "inline-block" }}
          onSelectionChange={(k) => k !== null && k != "" && setNewItem(k)}
          data-testid="select-element-test-id"
          isInvalid={!!fieldState.error?.message}
          errorMessage={fieldState.error?.message?.toString()}
          onInputChange={(s) => s == "" && setNewItem("")}
          aria-labelledby={name}
        >
          {(item) => (
            <AutocompleteItem key={item[0]} data-testid="select-item-test-id">
              {getItemLabel(item[1])}
            </AutocompleteItem>
          )}
        </Autocomplete>
        {/* Button for adding a new component */}
        <Button
          variant="ghost"
          style={{ display: "inline-block" }}
          onClick={() => handleAddItem(newItem.toString())}
        >
          Add
        </Button>
      </div>
    </div>
  );
}
