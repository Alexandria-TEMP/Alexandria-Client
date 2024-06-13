import { FileTreeT } from "./types/file-tree";

/**
 * Parses the file tree format given by the API into a nested object structure
 * @param items object with key filepaths and values file sizes
 * @returns file tree with type `FileTreeT = { [key: string]: FileTreeT | number }`
 */
export function parseFileTree(items: { [key: string]: number }): FileTreeT {
  const root: FileTreeT = {};
  const paths = Object.keys(items).filter((k) => k !== ".");

  paths.forEach((path) => {
    const parts = path.split("/");
    let currentLevel = root;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];

      if (i === parts.length - 1) {
        const isDirectory = items[path] < 0;
        if (isDirectory) {
          continue;
        }
        // Set to file size
        currentLevel[part] = items[path];
      } else {
        // If it's not the last part, it's a directory
        if (!currentLevel[part]) {
          currentLevel[part] = {};
        }
        currentLevel = currentLevel[part] as FileTreeT;
      }
    }
  });

  return root;
}
