import { ChildrenProp } from "@/lib/types/react-props/children-prop";

/**
 * Displays a structure with a body and a sidebar on its right side
 * @param children body
 * @param sidebar sidebar
 */
export default function BodyWithSidebar({
  children,
  sidebar,
}: ChildrenProp & Readonly<{ sidebar: React.ReactNode }>) {
  return (
    <div className="flex flex-row space-x-6 pt-8">
      <div className="w-10/12">{children}</div>
      <div className="w-2/12">{sidebar}</div>
    </div>
  );
}
