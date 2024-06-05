import { ChildrenProp } from "@/lib/types/react-props/children-prop";
import HeaderSubtle from "./header-subtle";
import { Chip } from "@nextui-org/react";

/**
 * Wraps children in a Chip and displays a faded title above them
 * @param title text displayed above Chip
 * @param children component wrapped in Chip
 */
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
