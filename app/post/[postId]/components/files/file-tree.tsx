// Needs to be a client component due to a bug in NextUI
// see https://github.com/nextui-org/nextui/issues/1342
"use client";

import { getNestedValue } from "@/lib/object-utils";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

// TODO remove
const data = {
  a: { b: { "c.txt": 5 }, "file.txt": 41 },
  "rootfile.txt": 86,
  dir: { "f.txt": 52 },
};

export default function FileTree() {
  const [path, setPath] = useState<string[]>([]);
  const [rows, setRows] = useState<{ name: string; size: number | string }[]>(
    [],
  );

  useEffect(() => {
    const opened = getNestedValue(data, path);

    if (!opened) {
      //
      throw new Error("!"); // TODO proper handling
    }

    if (typeof opened === "number") {
      // TODO is file, display contents
    } else {
      setRows(
        Object.entries(opened).map((entry) => ({
          name: entry[0],
          size: typeof entry[1] === "number" ? entry[1] : "-",
        })),
      );
    }
  }, [path]);

  return (
    <div className="flex flex-col gap-1">
      <Breadcrumbs
        onAction={(part) => {
          if (part === "Root") {
            setPath([]);
            return;
          }
          setPath(path.slice(0, path.indexOf(part as string) + 1));
        }}
      >
        <BreadcrumbItem>Root</BreadcrumbItem>
        {path.map((part) => (
          <BreadcrumbItem key={part}>{part}</BreadcrumbItem>
        ))}
      </Breadcrumbs>
      <Table
        removeWrapper
        onRowAction={(name) => setPath([...path, name as string])}
      >
        <TableHeader>
          <TableColumn key={"name"} allowsSorting>
            Name
          </TableColumn>
          <TableColumn key={"size"}>Size</TableColumn>
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow key={item.name}>
              {(col) => <TableCell>{item[col as "name" | "size"]}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
