"use client";

import useSWR, { SWRResponse } from "swr";
import { parseFileTree } from "../../file-tree-handler";
import { FileTreeT } from "../../types/file-tree";
import { QuartoContainerT } from "../../types/quarto-container";
import { baseUrl, validateResponse } from "../api-common";
import { useMemo } from "react";
import { toKebabCase } from "../string-utils";

/**
 * Builds URL path for quarto project API calls
 * @param container.id post or branch ID
 * @param container.type container type, ie if Quarto project is in a post or branch
 */
const buildResourcePath = ({ id, type }: QuartoContainerT) =>
  `${baseUrl}/${type === "branch" ? "branches" : "posts"}/${id}`;

/**
 * Fetches HTML render of a Quarto project.
 * @param container.id post or branch ID
 * @param container.type container type, ie if Quarto project is in a post or branch
 * @returns
 *    data: text contents of the HTML render (or undefined if not loaded),
 *    isPending: true if render is not finalized (or undefined if not loaded),
 *    error: error thrown by fetcher (or undefined),
 *    isLoading: if there's an ongoing request and no "loaded data"
 */
export function useRender(
  container: QuartoContainerT,
): SWRResponse<string, Error> & { isPending: boolean } {
  const swrResponse: SWRResponse<string, Error> = useSWR(
    `${buildResourcePath(container)}/render`,
    async (...args) => {
      const res = await fetch(...args);
      if (res.status === 202) return "pending";
      await validateResponse(res);
      return res.text();
    },
  );

  const isPending = useMemo(
    () => swrResponse.data === "pending",
    [swrResponse.data],
  );

  return {
    isPending,
    ...swrResponse,
  };
}

/**
 * Fetches file tree of a Quarto project and converts it to nested object format
 * @param container.id post or branch ID
 * @param container.type container type, ie if Quarto project is in a post or branch
 * @returns
 *    data: file tree (or undefined if not loaded),
 *    error: error thrown by fetcher (or undefined),
 *    isLoading: if there's an ongoing request and no "loaded data"
 */
export function useFileTree(
  container: QuartoContainerT,
): SWRResponse<FileTreeT, Error> {
  return useSWR(`${buildResourcePath(container)}/tree`, async (...args) => {
    const res = await fetch(...args);
    await validateResponse(res);
    const responseTree = (await res.json()) as { [key: string]: number };
    return parseFileTree(responseTree);
  });
}

/**
 * Fetches file contents of a given file in Quarto project
 * @param container.id post or branch ID
 * @param container.type container type, ie if Quarto project is in a post or branch
 * @param path path of the file within the project
 * @returns
 *    data: file contents as text (or undefined if not loaded),
 *    error: error thrown by fetcher (or undefined),
 *    isLoading: if there's an ongoing request and no "loaded data"
 */
export function useFileContents(
  container: QuartoContainerT,
  path: string,
): SWRResponse<string, Error> {
  return useSWR(
    `${buildResourcePath(container)}/file/${path}`,
    async (...args) => {
      const res = await fetch(...args);
      await validateResponse(res);
      return res.text();
    },
  );
}

/**
 * Downloads quarto project to client computer
 * @param container.id post or branch ID
 * @param container.type container type, ie if Quarto project is in a post or branch
 * @param filename name of the downloaded file, will be random if undefined
 */
export function downloadProject(
  container: QuartoContainerT,
  filename?: string,
) {
  fetch(`${buildResourcePath(container)}/repository`)
    .then(async (res) => {
      await validateResponse(res);
      return res.blob();
    })
    .then((blob) => {
      // Creates a link object to download file
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);

      // Set name for download
      if (filename) link.download = toKebabCase(filename);

      // Download file
      link.click();
    })
    .catch((reason: Error) => {
      // Let user know if anything went wrong
      alert(`Failed to download files. \n[${reason.message}]`);
    });
}
