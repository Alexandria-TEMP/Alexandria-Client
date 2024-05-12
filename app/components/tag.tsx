import { ChildrenProp } from "@/lib/children-prop-type";

export default function Tag({ children }: ChildrenProp) {
  return (
    <div className="rounded-lg px-3 bg-neutral-100 dark:bg-neutral-700 truncate text-nowrap hover:text-wrap">
      {children}
    </div>
  );
}
