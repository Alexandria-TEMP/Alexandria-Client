/* eslint-disable @typescript-eslint/no-unused-vars */
// TODO remove previous line once implemented

import { idT } from "../../types/api-types";
import { QuartoContainerTypeT } from "../../types/quarto-container";
import { baseUrl } from "../api-common";

/**
 * Builds URL path for collaborator API calls
 * @param id collaborator ID
 * @param containerType if Quarto project is in a post or branch
 */
const buildResourcePath = (id: idT, containerType: QuartoContainerTypeT) =>
  `${baseUrl}/${containerType === "branch" ? "branches" : "posts"}/collaborators/${id}`;

/**
 * TODO
 */
export async function fetchCollaborators(
  ids: idT[],
  containerType: QuartoContainerTypeT,
) {
  // TODO
}
