// Needs to be a client component due to a bug in NextUI
// see https://github.com/nextui-org/nextui/issues/1342
"use client";

import { getNestedValue } from "@/lib/object-utils";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Spinner,
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

  const handleNavigation = (part: string) => {
    if (part === "Root") {
      setPath([]);
      return;
    }
    setPath(path.slice(0, path.indexOf(part) + 1));
  };

  return (
    <Table
      onRowAction={(name) => setPath([...path, name as string])}
      removeWrapper
      classNames={{
        tbody: ["divide-y"],
        tr: ["hover:bg-primary-50"],
      }}
      topContent={
        <Breadcrumbs
          onAction={(key) => handleNavigation(key as string)}
          variant="solid"
          className="-mb-2"
        >
          <BreadcrumbItem>Root</BreadcrumbItem>
          {path.map((part) => (
            <BreadcrumbItem key={part}>{part}</BreadcrumbItem>
          ))}
        </Breadcrumbs>
      }
    >
      <TableHeader>
        <TableColumn key={"name"}>Name</TableColumn>
        <TableColumn key={"size"}>Size</TableColumn>
      </TableHeader>
      <TableBody
        items={rows}
        isLoading={false}
        loadingContent={<Spinner />}
        emptyContent="It looks like the project is empty."
      >
        {(item) => (
          <TableRow key={item.name}>
            {(col) => <TableCell>{item[col as "name" | "size"]}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
