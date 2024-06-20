import {
  BranchCollaboratorT,
  CollaborationTypeT,
  PostCollaboratorT,
  idT,
} from "@/lib/types/api-types";
import { QuartoContainerT } from "../../types/quarto-container";
import { baseUrl, validateResponse } from "../api-common";

/**
 * Builds URL path for collaborator API calls
 * @param container.id post or branch ID
 * @param container.type container type, ie if Quarto project is in a post or branch
 */
const buildResourcePath = ({ id, type }: QuartoContainerT) =>
  `${baseUrl}/${type === "branch" ? "branches" : "posts"}/collaborators/all/${id}`;

/**
 * Fetches all collaborators of a post
 * @param id post ID
 */
export async function fetchPostCollaborators(id: idT) {
  const res = await fetch(`${buildResourcePath({ id, type: "post" })}`, {
    next: { revalidate: 5 },
  });
  await validateResponse(res);
  return (await res.json()) as PostCollaboratorT[];
}

/**
 * Fetches all collaborators of a branch
 * @param id branch ID
 */
export async function fetchBranchCollaborators(id: idT) {
  const res = await fetch(`${buildResourcePath({ id, type: "branch" })}`);
  await validateResponse(res);
  return (await res.json()) as BranchCollaboratorT[];
}

/**
 * Fetches all collaborators of a post and returns their member IDs in a sorted object
 * @param id post ID
 */
export async function fetchPostCollaboratorsAsSortedMemberIDs(
  id: idT,
): Promise<{
  [key in CollaborationTypeT]: idT[];
}> {
  const collaborators = await fetchPostCollaborators(id);
  const sortedMembers = {
    author: [] as idT[],
    contributor: [] as idT[],
    reviewer: [] as idT[],
  };

  for (const collaborator of collaborators) {
    sortedMembers[collaborator.collaborationType] = [
      ...sortedMembers[collaborator.collaborationType],
      collaborator.memberID,
    ];
  }

  return sortedMembers;
}

/**
 * Fetches all collaborators of a branch and returns their member IDs
 * @param id branch ID
 */
export async function fetchBranchCollaboratorsMemberIDs(
  id: idT,
): Promise<idT[]> {
  return (await fetchBranchCollaborators(id)).map((c) => c.memberID);
}

/**
 * Fetches all collaborators of a post and returns their member IDs
 * @param id post ID
 */
export async function fetchPostCollaboratorsMemberIDs(id: idT): Promise<idT[]> {
  return Array.from(
    new Set((await fetchPostCollaborators(id)).map((c) => c.memberID)),
  );
}
