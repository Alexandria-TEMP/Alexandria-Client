import {
  QuartoContainerT,
  QuartoContainerTypeT,
} from "@/lib/types/quarto-container";
import { baseUrl, validateResponse } from "../api-common";
import { toKebabCase } from "@/lib/string-utils";

/**
 * Builds URL path for quarto project API calls
 * @param container.id post or branch ID
 * @param container.type container type, ie if Quarto project is in a post or branch
 */
export function buildResourcePath({ id, type }: QuartoContainerT) {
  return `${baseUrl}/${type === "branch" ? "branches" : "posts"}/${id}`;
}

/**
 * Returns fetch configuration for quarto project API calls, according to the
 * quarto project container type. Makes posts revalidate in 5 seconds and branches never.
 * @param type container type, ie if Quarto project is in a post or branch
 * @returns fetch configuration, used as second parameter of `fetch`
 */
export function buildFetchConfig(type: QuartoContainerTypeT) {
  return type === "post" ? { next: { revalidate: 5 } } : undefined;
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
  fetch(
    `${buildResourcePath(container)}/repository`,
    buildFetchConfig(container.type),
  )
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
