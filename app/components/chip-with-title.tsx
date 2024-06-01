import { ChildrenProp } from "@/lib/types/react-props/children-prop";
import HeaderSubtle from "./header-subtle";
import { Chip } from "@nextui-org/react";

export default function ChipWithTitle({
  title,
  children,
}: ChildrenProp & Readonly<{ title: string }>) {
  return (
    <div className="flex-col">
      <HeaderSubtle>{title}</HeaderSubtle>
      <Chip>{children}</Chip>
    </div>
  );
}
