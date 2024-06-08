import { Chip } from "@nextui-org/react";

/**
 * Displays a wrapping row of labels, each wrapped in a simple Chip
 * @param labels string values to be wrapped in Chips
 */
export default function ChipList({ labels }: Readonly<{ labels: string[] }>) {
  return (
    <div className="flex flex-row flex-wrap gap-3">
      {labels.map((label, index) => (
        <Chip key={index}>{label}</Chip>
      ))}
    </div>
  );
}
