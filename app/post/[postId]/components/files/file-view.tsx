"use client";

import DefaultError from "@/error";
import { useFileContents } from "@/lib/api-hooks/version-hooks";
import { parseId } from "@/lib/string-utils";
import { IdProp } from "@/lib/types/react-props/id-prop";
import GenericLoadingPage from "@/loading";
import { useState } from "react";

/**
 * Displays contents of some file in a version
 * @param id version ID
 * @param path filepath
 */
export default function FileView({
  id,
  path,
}: IdProp &
  Readonly<{
    path: string;
  }>) {
  const { data, error, isLoading } = useFileContents(parseId(id), path);
  // Used to trigger a rerender in case of an error
  const [rerender, setRerender] = useState(false);

  if (error) {
    return <DefaultError error={error} reset={() => setRerender(!rerender)} />;
  }

  if (isLoading) {
    return <GenericLoadingPage />;
  }

  return (
    <div className="px-2 border-2 bg-default-100 rounded-md font-mono">
      {data}
    </div>
  );
}
