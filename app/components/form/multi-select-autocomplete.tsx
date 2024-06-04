// disable reason: this is kind of a shitty one to have to disable,
// but basicallly it is complaining because the useController hook is called conditionally
// this is because the "control" parameter is marked as optional
// it is not optional in practice
// but if i dont make it optional it breaks the tests and i have not figured out how to solve that
// added a todo in custom component types
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useEffect, useState } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { FieldValues, useController } from "react-hook-form";
import { MultiSelectAutocompleteT } from "@/lib/custom-autocomplete-types";
import { Switch, Tooltip } from "@nextui-org/react";

/**
 * Searchable dropdown which mimics multi select by adding the selected items to a list of removable tags.
 * As a field of a form, this corresponds to an array of item keys (strings in this case)
 * Should be a child of a form that uses react-hook-form
 * See `component-types.d.ts` for documentation on prop types and fields, additionally:
 * @returns a div containing the title, list of selected items, the dropdown and add button
 */
export function MultiSelectAutocomplete<
  Type extends { id: string },
  FormType extends FieldValues,
>({
  label: title,
  description,
  placeholder = "Search...",
  control,
  trigger,
  name,
  rules,
  disableFieldName,
  disableMessage,
  getItemLabel,
  optionsGetter,
  nonRemovables = [] as string[],
  nonRemoveReason,
}: MultiSelectAutocompleteT<Type, FormType>) {
  /* Register the field as part of the parent form using appropriate name and rules  */
  const fieldMethods = useController({
    name,
    control,
    rules,
  });

  /* Register the anonimity/disable switch with the form, if one is provided */
  const disableFieldMethods =
    !!disableFieldName &&
    useController({
      name: disableFieldName,
      control: control,
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
  const [items, setItems] = useState<string[]>(fieldMethods.field.value);

  /* Update the value when post request finishes */
  useEffect(() => {
    setItems(fieldMethods.field.value);
  }, [fieldMethods.field.value]);

  /**
   * The list of options that the user can select from,
   * This has to be a map because of how this component is structured, though its not mega robust
   */
  const [options, setOptions] = useState<Map<string, Type>>(new Map());

  /**
   * Update the options list when request for them finishes
   */
  useEffect(() => {
    const getOptions = async () => {
      const opts: Type[] = await optionsGetter();
      setOptions(new Map(opts.map((o: Type) => [o.id, o])));
    };

    getOptions().catch(() => console.log("error fetching data")); // TODO maybe make it refetch the data if it fails
  }, [optionsGetter]);

  /**
   * Method for removing an item from the item list,
   * updates both the items array used for displaying, and the field.value which stores the answer to the form
   * Uses set functionality to ensure there are no duplicates
   * @param removed the key of the item to be removed
   */
  const handleRemoveItem = (removed: string) => {
    const newItems = Array.from(new Set(items.filter((e) => e !== removed)));
    setItems(newItems);
    fieldMethods.field.onChange(newItems);
    fieldMethods.field.onBlur(); /* Make sure the form hook knows the field value has been changed */
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
      fieldMethods.field.onChange(newItems);
      fieldMethods.field.onBlur(); /* Make sure the form hook knows the field value has been changed */
    }
  };

  return (
    <div className="space-y-2" data-testid="mutliselect-test-id">
      <span>
        {/* title of the field, if it is does not satisfy form validation conditions it will be colored as an error */}
        <span
          aria-label={name}
          className={"inline-block".concat(
            !fieldMethods.fieldState.error ? "" : " text-danger",
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
        {/* the switch for disabling this field (aka dont require list of items) */}
        {!!disableFieldName && (
          <div className="w-full">
            <Switch
              onChange={() => {
                disableFieldMethods &&
                  disableFieldMethods.field.onChange(
                    !disableFieldMethods.field.value,
                  );
                // TODO fix this
                // disable reason: i need to push, problem is i can await this here because i am in client component
                //eslint-disable-next-line @typescript-eslint/no-floating-promises
                !!trigger && trigger();
              }}
            >
              {disableMessage}
            </Switch>
          </div>
        )}

        {/* the list of items, only display it if the field is not disabled */}
        {(!disableFieldName ||
          (disableFieldMethods && !disableFieldMethods.field.value)) &&
          items.map((item) =>
            !nonRemovables.includes(item) ? (
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
            ) : (
              <Tooltip content={nonRemoveReason} placement="bottom" key="t">
                <Chip variant="bordered" key={item} data-testid="chip-test-id">
                  {/* // TODO this is super inefficient but idk how to do this better
                            // cause i cannot directly store the object from the autocomplete component, i can only get keys
                            // i also cannot make the labels the keys because that breaks react for some reason */}
                  {getItemLabel(options.get(item))}
                </Chip>
              </Tooltip>
            ),
          )}
      </div>
      <div className="flex flex-row justify-between gap-x-3">
        {/* The actual autocomplete component */}
        <Autocomplete
          defaultItems={options}
          placeholder={placeholder}
          description={description}
          style={{ display: "inline-block" }}
          onSelectionChange={(k) => k !== null && k != "" && setNewItem(k)}
          data-testid="select-element-test-id"
          isInvalid={!!fieldMethods.fieldState.error?.message}
          errorMessage={fieldMethods.fieldState.error?.message?.toString()}
          onInputChange={(s) => s == "" && setNewItem("")}
          aria-labelledby={name}
          isDisabled={disableFieldMethods && disableFieldMethods.field.value}
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
