import { FieldValues, Control, Path, UseFormTrigger } from "react-hook-form";
import { idT } from "./api-types";

/**
 * Possible props for the custom Multi and Single select Autcomplete components
 * These components are meant to be children of a form built using react-hook-form
 * The type can be extended with additional properties should they be necessary
 * @template Type the type of the objects in the options list
 * @template FormType the type of the the fields of the parent form, required for form control object
 * @param title the displayed title of what the component represents, can be just text or a node (for ex, if its a header element)
 * @param description the displayed description of what the component represents
 * @param placeholder the displayed placeholder before an item is selected
 * @param name the (not displayed) name of the field this component corresponds to, as specified in parent react hook form
 * @param control the form control object passed down from parent form, used to manage field values
 *                optional, as it can be injected
 * @param rules client side validation rules, this component only accepts "required" and "validate" rules for now
 *              see NextUI page for more rules that can be added: https://www.react-hook-form.com/api/useform/register/#options
 *              optional, because there might be no rules
 * @param optionsGetter funciton that handles providing the options; should be async function that fetches possible values from the server
 *                      although for single select the values are currently not fetched from server, they are hardcoded, so they could also be just a normal function, not async
 */
export type CustomAutocompletePropsT<Type, FormType extends FieldValues> = {
  label: React.ReactNode;
  description?: string;
  placeholder?: string;
  name: Path<FormType>;
  control?: Control<FormType>;
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
  optionsGetter: () => Promise<Type[]> | Type[];
};

/**
 * Same as the props for CustomeAutocompelteProps, except the SingleSelectAutocomplete component
 * is specifically designed to work with an array of strings as the options
 * see SingleSelectAutocomplete for more info
 */
export type SingleSelectAutocompleteT<FormType extends FieldValues> =
  CustomAutocompletePropsT<string, FormType>;

/**
 * Type specifically made for the MultiSelectAutocomplete component
 * The same as CustomAutocompletePropsT, additionally:
 * @template Type the type of the objects in the options list, these objects must have an ID
 *                 since MultiSelect needs to make a map of them
 * @param trigger method passed from parent form that triggers form validation when called, used in the case where there is a disable/anonimity option
 *                because in that case the rules object will likely have a validation rule that depends on the state of the anonimity variable: https://react-hook-form.com/docs/useform/trigger
 *                and validation does not get trigerred properly if not called manually, for more uses or trigger see:
 * @param disableFieldName the name of the form field that holds the switch value, intented to be used for anonimity feature
 * @param disableMessage the description of what disabling this field does
 * @param getItemLabel method that returns the desired string representation of the objects in the dropdown
 * @param optionsGetter funciton that fetches the list of items in the dropdown from the server, return and array of the items (these need to have ids)
 * @param nonRemovables a list of the id's of options that cannot be removed from the list of selected items
 * @param nonRemoveReason the reason why an item in non removables cannot be removed
 */
export type MultiSelectAutocompleteT<
  Type extends { id: idT },
  FormType extends FieldValues,
> = CustomAutocompletePropsT<Type, FormType> & {
  trigger?: UseFormTrigger<FormType>;
  disableFieldName?: Path<FormType>;
  disableMessage?: string;
  getItemLabel: (i: Type | undefined) => string;
  nonRemovables?: idT[];
  nonRemoveReason?: string;
};

/**
 * Possible props for the custom UploadContentCard component
 * This component should be a child of a form built using react-hook-form
 * @template FormType the type of the the fields of the parent form, required for form control object
 * @param name the (not displayed) name of the field this component corresponds to, as specified in parent react hook form
 * @param control the form control object passed down from parent form, used to manage field values
 *                optional, as it can be injected
 * @param rules client side validation rules, this component only accepts "required" and "validate" rules for now
 *              see NextUI page for more rules that can be added: https://www.react-hook-form.com/api/useform/register/#options
 *              optional, because there might be no rules
 */
export type UploadContentT<FormType extends FieldValues> = {
  name: Path<FormType>;
  control?: Control<FormType>;
  rules?: {
    required?:
      | string
      | {
          value: boolean;
          message: string;
        };
    // can be extended with multiple types
    validate?: (value: string[]) => boolean | string;
  };
};
