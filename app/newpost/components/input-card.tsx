import { Input } from "@nextui-org/input";

/**
 * Component that represents a text input field with a title
 * @param param0 prop object for the component where
 * - title: the title of the input field
 * - placeholder: placeholder text for input field
 * - setValue: setter for the variable which stores the contents of the input field; expected to come from react useState hook
 * @returns a div containing the title and the input field
 */
export default function InputCard({
  title,
  placeholder,
  setValue,
}: {
  title: string;
  placeholder: string;
  setValue: (item: string) => void;
}) {
  return (
    <div className="space-y-2">
      <h2>{title}</h2>
      <Input
        className="max-w-full"
        placeholder={placeholder}
        isRequired={true}
        onChange={(e) => setValue(e.currentTarget.value)}
      />
    </div>
  );
}
