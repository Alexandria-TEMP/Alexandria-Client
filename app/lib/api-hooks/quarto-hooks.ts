import { getFileContents, getFileTree } from "../api-calls/quarto-api";
import { useEffect, useState } from "react";
import { FileTreeT } from "../types/file-tree";
import { QuartoContainerT } from "../types/quarto-container";

/**
 * React hook to get file tree data
 * @param container.id post or branch ID
 * @param container.type container type, ie if Quarto project is in a post or branch
 * @returns
 *    data: file tree data for the given id resolved by fetcher (or undefined if not loaded),
 *    error: error thrown by fetcher (or undefined),
 *    isLoading: if there's an ongoing request and no "loaded data"
 */
export function useFileTree(container: QuartoContainerT) {
  const [data, setData] = useState<FileTreeT>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  useEffect(() => {
    getFileTree(container)
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [container]);
  return { data, isLoading, error };
}

/**
 * React hook to get file contents
 * @param container.id post or branch ID
 * @param container.type container type, ie if Quarto project is in a post or branch
 * @param path path of the file in project
 * @returns
 *    data: file data for the given id and path resolved by fetcher (or undefined if not loaded),
 *    error: error thrown by fetcher (or undefined),
 *    isLoading: if there's an ongoing request and no "loaded data"
 */
export function useFileContents(container: QuartoContainerT, path: string) {
  const [data, setData] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  useEffect(() => {
    getFileContents(container, path)
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [container, path]);
  return { data, isLoading, error };
}
