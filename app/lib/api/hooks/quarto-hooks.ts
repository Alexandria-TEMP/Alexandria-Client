"use client";

import useSWR, { SWRResponse } from "swr";
import { parseFileTree } from "../../file-tree-handler";
import { FileTreeT } from "../../types/file-tree";
import { QuartoContainerT } from "../../types/quarto-container";
import { validateResponse } from "../api-common";
import { useMemo } from "react";
import { buildResourcePath } from "../services/quarto-api";

/**
 * Fetches HTML render of a Quarto project.
 * @param container.id post or branch ID
 * @param container.type container type, ie if Quarto project is in a post or branch
 * @returns
 *    data: text contents of the HTML render (or undefined if not loaded),
 *    isPending: true if render is not finalized (or undefined if not loaded),
 *    hasFailed: true if render failed (or undefined if not loaded),
 *    error: error thrown by fetcher (or undefined),
 *    isLoading: if there's an ongoing request and no "loaded data"
 */
export function useRender(
  container: QuartoContainerT,
): SWRResponse<string, Error> & { isPending: boolean; hasFailed: boolean } {
  const swrResponse: SWRResponse<string, Error> = useSWR(
    `${buildResourcePath(container)}/render`,
    async (...args) => {
      const res = await fetch(...args, {
        cache: "no-store",
        headers: [["Accept", "text/html"]],
      });
      if (res.status === 202) return "pending";
      if (res.status === 204) return "render failed";
      await validateResponse(res);

      return await res.text();
    },
  );

  const isPending = useMemo(
    () => swrResponse.data === "pending",
    [swrResponse.data],
  );

  const hasFailed = useMemo(
    () => swrResponse.data === "render failed",
    [swrResponse.data],
  );

  return {
    isPending,
    hasFailed,
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
    const res = await fetch(...args, { cache: "no-store" });
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
      if (path === "") return "";

      const res = await fetch(...args, { cache: "no-store" });
      await validateResponse(res);
      return res.text();
    },
  );
}
