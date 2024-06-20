import { QuartoContainerT } from "@/lib/types/quarto-container";
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
