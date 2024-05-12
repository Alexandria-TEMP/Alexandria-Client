import { ChildrenProp } from "@/lib/children-prop-type";

export default function ContentBox({ children }: ChildrenProp) {
  return (
    <div className="p-4 max-w-full rounded-lg bg-white dark:bg-black">
      {children}
    </div>
  );
}
