import { FieldValues } from "react-hook-form";

/**
 * Possible parameters for the custom Multi and Single select Autcomplete components
 * These components are meant to be children of a form built using react-hook-form
 * The type can be extended with additional properties should they be necessary
 * @template Type: the type of the objects in the options list
 * @template OptionsType: the type that represents the format in which the list of items in the Autocomplete is provided,
 *                        needs its own type because for instance you can have array, map, set, etc of Type
 * @template KeyType: the type for the keys of the items
 * @template FormType: the type of the the fields of the parent form, required for form control object
 *
 * @param title: the displayed title of what the component represents, can be just text or a node (for ex, if its a header element)
 * @param description: the displayed description of what the component represents
 * @param placeholder: the displayed placeholder before an item is selected
 * @param defaultSelectedKey: the default selected item, if any
 * @param options: the list of items in the autocomplete dropdown
 * @param name: the (not displayed) name of the field this component corresponds to, as specified in parent react hook form
 * @param control: the form control object passed down from parent form, used to manage field values
 * @param rules: client side validation rules, this component only accepts "required" and "validate" rules for now
 *               see NextUI page for more rules that can be added: https://www.react-hook-form.com/api/useform/register/#options
 * @param getItemLabel: method that returns the desired string representation of the objects in the dropdown
 */
export type CustomAutocompleteProps<
  Type,
  OptionsType,
  KeyType,
  FormType extends FieldValues,
> = {
  label: React.ReactNode;
  description?: string;
  placeholder?: string;
  defaultSelectedKey?: KeyType;
  options: OptionsType;
  name: string;
  control: Control<FormType>;
  rules?: {
    required?:
      | string
      | {
          value: boolean;
          message: string;
        };
    // This is the only type of validation function i have used so far,
    // can be extended with multiple types
    validate?: (value: string[]) => boolean | string;
  };
  getItemLabel: (i: Type | undefined) => string;
};
