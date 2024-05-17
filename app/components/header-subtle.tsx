import { ChildrenProp } from "@/lib/children-prop-type";

/**
 * Heading meant to not call attention to itself. Faded color and small text size.
 *
 * @param children React children.
 */
export default function HeaderSubtle({ children }: ChildrenProp) {
  return <h6 className="text-neutral-400">{children}</h6>;
}