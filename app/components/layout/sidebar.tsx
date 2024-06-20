import { Tooltip } from "@nextui-org/react";
import { Fragment } from "react";

/**
 * Displays a column list of items, each with a small gap between them.
 * The list sticks to the top of the page when scrolling.
 * @param title optional header for the sidebar
 * @param items items rendered within the sidebar
 */
export default function Sidebar({
  title,
  items,
}: Readonly<{
  title?: string;
  items: { title: string; tooltip?: string; node: React.ReactNode }[];
}>) {
  return (
    <div className="sticky top-20">
      {title && <h2>{title}</h2>}
      {items.map((item, index) => (
        <Fragment key={index}>
          <Tooltip content={item.tooltip} isDisabled={!item.tooltip}>
            <h3>{item.title}</h3>
          </Tooltip>
          {item.node}
          <div className="h-4" />
        </Fragment>
      ))}
    </div>
  );
}
