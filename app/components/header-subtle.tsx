import { ChildrenProp } from "@/lib/children-prop-type";

export default function HeaderSubtle({ children }: ChildrenProp) {
  return <h6 className="text-neutral-400">{children}</h6>;
}
