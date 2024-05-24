"use client";

import { useState } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { Control, FieldValues, useController, Path } from "react-hook-form";

/**
 * Searchable dropdown which mimics multi select by adding the selected items to a list of removable tags.
 * Should be a child of a form that uses react-hook-form
 * It is intended to modify a field that corresponds to an array of strings (the keys for the items that are selected)
 * @param title: the title of what the dropdown represents
 * @param description: the description of what the dropdown represents
 * @param options: the list of items in the dropdown, needs to be a key-value pair, the key is what is used for selected items
 * @param name: the name of the field this component corresponds to, as specified in parent react hook form
 * @param control: the form control object passed down from parent form, used to manage field values
 * @param rules: client side validation rules, this component only accepts "required" and "validate" rules
 *               see NextUI page for more rules that can be added: https://www.react-hook-form.com/api/useform/register/#options
 * @param getItemLabel: method that returns the desired string representation of the object in the dropdown
 * @returns a div containing the title, list of selected items, the dropdown and add button
 */
export function MultiSelectAutocomplete<Type, FormType extends FieldValues>({
  title,
  description,
  options,
  name,
  control,
  rules = {
    required: {
      value: false,
      message: "Please fill out this field.",
    },
  },
  getItemLabel,
}: {
  title: string;
  description: string;
  options: Map<string, Type>;
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
  getItemLabel: (i: Type | undefined) => string;
}) {
  const { field, fieldState } = useController({
    name,
    control,
    rules,
  });

  const [newItem, setNewItem] = useState<React.Key>("");
  // still need this state array because its not guaranteed that field value is string
  const [items, setItems] = useState<string[]>(field.value);

  const handleRemoveItem = (removed: string) => {
    const newItems = Array.from(new Set(items.filter((e) => e !== removed)));
    setItems(newItems);
    field.onChange(newItems);
  };

  const handleAddItem = () => {
    if (newItem !== "") {
      const newItems = Array.from(new Set([...items, newItem.toString()]));
      setItems(newItems);
      field.onChange(newItems);
    }
  };

  return (
    <div className="space-y-2" data-testid="mutliselect-test-id">
      <span>
        {/* title of the field, if it is does not satisfy form conditions it will be red */}
        <h2
          className={"inline-block".concat(
            !fieldState.error ? "" : " text-danger",
          )}
        >
          {title}
        </h2>
        {/* if the field is required, display required asterisk */}
        {rules.required && (
          <h2 className="inline-block text-danger text-small">*</h2>
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
                            // i also cannot make the labels the keys because that is so slow it breaks react */}
            {getItemLabel(options.get(item.toString()))}
          </Chip>
        ))}
      </div>
      <div className="flex flex-row justify-between gap-x-3">
        <Autocomplete
          defaultItems={options.entries()}
          placeholder="Search..."
          description={description}
          style={{ display: "inline-block" }}
          onSelectionChange={(k) => k !== null && k != "" && setNewItem(k)}
          data-testid="select-element-test-id"
          isInvalid={!!fieldState.error?.message}
          errorMessage={fieldState.error?.message?.toString()}
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
          onClick={handleAddItem}
        >
          Add
        </Button>
      </div>
    </div>
  );
}
