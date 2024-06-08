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
import { Suspense, useEffect, useState } from "react";
import FileView from "./file-view";
import { IdProp } from "@/lib/types/react-props/id-prop";
import { parseId } from "@/lib/string-utils";
import { useFileTree } from "@/lib/api-hooks/version-hooks";
import GenericLoadingPage from "@/loading";

export default function FileTree({ id }: IdProp) {
  const { data, isLoading, error } = useFileTree(parseId(id));

  const [path, setPath] = useState<string[]>([]);
  const [rows, setRows] = useState<{ name: string; size: number | string }[]>(
    [],
  );
  const [openedFile, setOpenedFile] = useState(false);

  useEffect(() => {
    if (!data) return;

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
  }, [path, data]);

  if (error) {
    // TODO
    return <div>Placeholder error</div>;
  }

  const breadcrumbs = (
    <Breadcrumbs
      onAction={(key) => {
        const part = key as string;
        if (part === "Root") {
          setPath([]);
          return;
        }
        setPath(path.slice(0, path.indexOf(part) + 1));
      }}
      variant="solid"
    >
      <BreadcrumbItem>Root</BreadcrumbItem>
      {path.map((part) => (
        <BreadcrumbItem key={part}>{part}</BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );

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
        isLoading={isLoading}
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

  const fileContents = (
    <Suspense fallback={<GenericLoadingPage />}>
      <FileView
        id={id}
        path={path.reduce((accum, item) => accum.concat(`/${item}`), "")}
      />
    </Suspense>
  );

  return (
    <div className="flex flex-col gap-2">
      {breadcrumbs}
      {!openedFile ? fileTable : fileContents}
    </div>
  );
}
