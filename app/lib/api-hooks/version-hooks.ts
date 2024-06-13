import { idT } from "../types/api-types";
import { getFileContents, getFileTree } from "../api-calls/version-api";
import { useEffect, useState } from "react";
import { FileTreeT } from "../types/file-tree";

/**
 * React hook to get file tree data
 * @param id branch ID to get file tree from
 * @returns
 *    data: file tree data for the given id resolved by fetcher (or undefined if not loaded),
 *    error: error thrown by fetcher (or undefined),
 *    isLoading: if there's an ongoing request and no "loaded data"
 */
export function useFileTree(id: idT) {
  const [data, setData] = useState<FileTreeT>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  useEffect(() => {
    getFileTree(id)
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [id]);
  return { data, isLoading, error };
}

/**
 * React hook to get file contents
 * @param id branch ID to get file from
 * @param path path of the file in project
 * @returns
 *    data: file data for the given id and path resolved by fetcher (or undefined if not loaded),
 *    error: error thrown by fetcher (or undefined),
 *    isLoading: if there's an ongoing request and no "loaded data"
 */
export function useFileContents(id: idT, path: string) {
  const [data, setData] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  useEffect(() => {
    getFileContents(id, path)
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [id, path]);
  return { data, isLoading, error };
}
