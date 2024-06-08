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
import FileView from "./file-view";

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
  const [openedFile, setOpenedFile] = useState(false);

  useEffect(() => {
    const opened = getNestedValue(data, path);

    if (!opened) {
      throw new Error(
        `file tree ${JSON.stringify(data)} has no file in path ${path.toString()}`,
      );
    }

    setOpenedFile(typeof opened === "number");

    if (typeof opened !== "number") {
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

  const fileTable = (
    <Table
      onRowAction={(name) => setPath([...path, name as string])}
      removeWrapper
      classNames={{
        tbody: ["divide-y"],
        tr: ["hover:bg-primary-50"],
      }}
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

  return (
    <div className="flex flex-col gap-2">
      <Breadcrumbs
        onAction={(key) => handleNavigation(key as string)}
        variant="solid"
      >
        <BreadcrumbItem>Root</BreadcrumbItem>
        {path.map((part) => (
          <BreadcrumbItem key={part}>{part}</BreadcrumbItem>
        ))}
      </Breadcrumbs>
      {!openedFile ? (
        fileTable
      ) : (
        <FileView
          versionId={-1}
          path={path.reduce((accum, item) => accum.concat(`/${item}`), "")}
        />
      )}
    </div>
  );
}
