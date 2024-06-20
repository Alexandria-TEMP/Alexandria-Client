"use client";

import DefaultError from "@/error";
import { useFileContents } from "@/lib/api/hooks/quarto-hooks";
import useTriggerRerender from "@/lib/hooks/use-trigger-rerender";
import { idT } from "@/lib/types/api-types";
import { QuartoContainerTypeT } from "@/lib/types/quarto-container";
import { IdProp } from "@/lib/types/react-props/id-prop";
import GenericLoadingPage from "@/loading";

/**
 * Displays contents of some file in a project
 * @param id post or branch ID
 * @param container quarto project's container: "post" or "branch"
 * @param path filepath
 */
export default function FileView({
  id,
  path,
  container,
}: IdProp &
  Readonly<{
    path: string;
    container: QuartoContainerTypeT;
  }>) {
  const { data, error, isLoading } = useFileContents(
    {
      id: id as idT,
      type: container,
    },
    path,
  );
  const { triggerRerender } = useTriggerRerender();

  if (error) {
    return <DefaultError error={error} reset={triggerRerender} />;
  }

  if (isLoading) {
    return <GenericLoadingPage />;
  }

  return (
    <div className="px-2 border-2 bg-default-100 rounded-md font-mono whitespace-pre-line">
      {data}
    </div>
  );
}
