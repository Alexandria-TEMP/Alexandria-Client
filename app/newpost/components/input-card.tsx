import { Input } from "@nextui-org/input";

export default function InputCard({
  title,
  placeholder,
  value,
  setValue,
}: {
  title: string;
  placeholder: string;
  value: string;
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
