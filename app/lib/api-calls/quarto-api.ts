/* eslint-disable @typescript-eslint/no-unused-vars */
// TODO remove disable above once functions are properly implemented

import useSWR, { SWRResponse } from "swr";
import { parseFileTree } from "../file-tree-handler";
import { FileTreeT } from "../types/file-tree";
import { QuartoContainerT } from "../types/quarto-container";
import { baseUrl, validateResponse } from "./api-common";

/**
 * Builds URL path for quarto project API calls
 * @param container.id post or branch ID
 * @param container.type container type, ie if Quarto project is in a post or branch
 */
const buildResourcePath = ({ id, type }: QuartoContainerT) =>
  `${baseUrl}/${type === "branch" ? "branches" : "posts"}/${id}`;

/**
 * Fetches HTML render of a Quarto project.
 * @async
 * @param container.id post or branch ID
 * @param container.type container type, ie if Quarto project is in a post or branch
 * @returns Text contents of the HTML render
 */
export async function fetchRender(
  container: QuartoContainerT,
): Promise<string> {
  const res = await fetch(`${buildResourcePath(container)}/render`);
  if (res.status === 202) return "pending";
  await validateResponse(res);
  return res.text();
}

/**
 * Fetches file tree of a Quarto project and converts it to nested object format
 * @async
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
 * @async
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
