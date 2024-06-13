/* eslint-disable @typescript-eslint/no-unused-vars */
// TODO remove disable above once functions are properly implemented

import { parseFileTree } from "../file-tree-handler";
import { idT } from "../types/api-types";
import { FileTreeT } from "../types/file-tree";
import { baseUrl } from "./api-common";

/**
 * Fetches HTML render of a Quarto project.
 * @async
 * @param id TODO
 * @returns Text contents of the HTML render
 */
export async function getRender(id: idT): Promise<string> {
  // TODO update
  const res = await fetch(`${baseUrl}/versions/${id}/render`);
  if (res.status === 202) {
    return "pending";
  }
  if (!res.ok) {
    const error = res.headers.get("error") ?? undefined;
    throw new Error(error);
  }

  return res.text();
}

/**
 * TODO jsdoc when properly implemented
 */
export async function getVersionData(id: idT) {
  // TODO
  await new Promise((resolve) => setTimeout(resolve, 100));
  return {
    id,
    discussionIDs: [0, 1, 2, 3],
    renderStatus: "success",
  };
}

/**
 * TODO jsdoc when properly implemented
 */
export async function getFileTree(id: idT): Promise<FileTreeT> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return parseFileTree({
    "a/b/c.txt": 5,
    "a/b": -1,
    a: -1,
    "rootfile.txt": 86,
    "a/file.txt": 8235000,
    "dir/f.txt": 2430,
    dir: -1,
  });
}

/**
 * TODO jsdoc when properly implemented
 */
export async function getFileContents(id: idT, path: string) {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut imperdiet mi eget velit pulvinar aliquet. Duis molestie, nunc eget varius vestibulum, magna libero interdum tortor, vitae egestas dolor libero eget libero. Aliquam congue nec nisi vel luctus. Proin tortor dolor, tempor malesuada maximus id, lacinia eu neque. Maecenas elementum quis magna eget suscipit. Duis id mauris est. Cras varius hendrerit elit, ac commodo metus sollicitudin id. Suspendisse quis eros sit amet dui ultricies volutpat et at ex. Fusce eu neque in purus maximus pretium. Cras efficitur fermentum enim, eu imperdiet arcu condimentum eu. In a ultrices odio. Maecenas in maximus erat.";
}
