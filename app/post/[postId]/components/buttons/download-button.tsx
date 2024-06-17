"use client";

import { downloadProject } from "@/lib/api/services/quarto-api";
import { idT } from "@/lib/types/api-types";
import { QuartoContainerTypeT } from "@/lib/types/quarto-container";
import { IdProp } from "@/lib/types/react-props/id-prop";
import { CloudArrowDownIcon } from "@heroicons/react/20/solid";
import { Button, Tooltip } from "@nextui-org/react";

/**
 * Small download button, that downloads projects files on click
 * @param id post or branch ID
 * @param container quarto project's container: "post" or "branch"
 * @param projectTitle project title used to name of the downloaded file
 */
export default function DownloadButton({
  id,
  container,
  projectTitle,
}: IdProp &
  Readonly<{ container: QuartoContainerTypeT; projectTitle?: string }>) {
  return (
    <Tooltip
      content="Download publication's Quarto project."
      placement="bottom"
    >
      <Button
        isIconOnly
        onPress={() =>
          downloadProject({ id: id as idT, type: container }, projectTitle)
        }
      >
        <CloudArrowDownIcon className="size-6" />
      </Button>
    </Tooltip>
  );
}
