import { baseUrl } from "../api-common";
import { ProjectPostCreationFormT, ProjectPostT } from "../../types/api-types";
import { validateResponse } from "../api-common";

/**
 * Method that sends a POST request to the server to create a new project post, currently only metadata
 * @param postCreationForm object containing project post creation form data
 */
export async function postProjectPost(
  projectPostCreationForm: ProjectPostCreationFormT,
): Promise<ProjectPostT> {
  const jsonProjectPost = JSON.stringify(projectPostCreationForm);
  const response = await fetch(baseUrl + "/project-posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonProjectPost,
    // If someone uploads the exact same contents, we don't want the same response
    next: { revalidate: 0 },
  });
  await validateResponse(response);
  const projectPost: ProjectPostT = (await response.json()) as ProjectPostT;
  return projectPost;
}
