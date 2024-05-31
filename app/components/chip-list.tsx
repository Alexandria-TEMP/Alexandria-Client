import { Chip } from "@nextui-org/react";

export default function ChipList({ labels }: Readonly<{ labels: string[] }>) {
  return (
    <div className="flex flex-row flex-wrap gap-3">
      {labels.map((label, index) => (
        <Chip key={index}>{label}</Chip>
      ))}
    </div>
  );
}
