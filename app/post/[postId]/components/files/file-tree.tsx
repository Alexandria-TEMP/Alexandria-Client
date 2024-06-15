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
import { IdProp } from "@/lib/types/react-props/id-prop";
import { getByteMultiple } from "@/lib/get-format";
import { DocumentIcon, FolderIcon } from "@heroicons/react/20/solid";
import DefaultError from "@/error";
import { idT } from "@/lib/types/api-types";
import { QuartoContainerTypeT } from "@/lib/types/quarto-container";
import { useFileTree } from "@/lib/api/hooks/quarto-hooks";

/**
 * Displays a table with all files in the Quarto project, allowing one to
 * click through them and open them
 * @param id post or branch ID
 * @param container quarto project's container: "post" or "branch"
 */
export default function FileTree({
  id,
  container,
}: IdProp & Readonly<{ container: QuartoContainerTypeT }>) {
  const { data, isLoading, error } = useFileTree({
    id: id as idT,
    type: container,
  });

  const [path, setPath] = useState<string[]>([]);
  const [rows, setRows] = useState<{ name: string; size: number }[]>([]);
  const [openedFile, setOpenedFile] = useState(false);
  // Used to trigger a rerender in case of an error
  const [rerender, setRerender] = useState(false);

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
          size: typeof entry[1] === "number" ? entry[1] : -1,
        })),
      );
    }
  }, [path, data]);

  if (error) {
    return <DefaultError error={error} reset={() => setRerender(!rerender)} />;
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
      aria-label="Quarto project's file tree"
      onRowAction={(name) => setPath([...path, name as string])}
      selectionMode="single" // highlights on hover
      removeWrapper
      classNames={{
        tbody: ["divide-y"],
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
            <TableCell>
              <div className="flex flex-row items-end gap-2">
                {item.size < 0 ? (
                  <FolderIcon className="size-4" />
                ) : (
                  <DocumentIcon className="size-4" />
                )}
                {item.name}
              </div>
            </TableCell>
            <TableCell className="w-56">
              {item.size < 0 ? "-" : getByteMultiple(item.size)}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );

  const fileContents = (
    <FileView
      id={id as idT}
      container={container}
      path={path.reduce((accum, item) => accum.concat(`/${item}`), "")}
    />
  );

  return (
    <div className="flex flex-col gap-2">
      {breadcrumbs}
      {!openedFile ? fileTable : fileContents}
    </div>
  );
}
