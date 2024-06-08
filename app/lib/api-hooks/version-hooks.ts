import { idType } from "../types/api-types";
import { getFileTree } from "../api-calls/version-api";
import { useEffect, useState } from "react";
import { FileTreeT } from "../file-tree-handler";

export function useFileTree(id: idType) {
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
