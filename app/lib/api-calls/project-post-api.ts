import { baseUrl } from "./api-common";
import { ProjectPostCreationFormT, ProjectPostT } from "../types/api-types";
import { validateResponse } from "./api-common";

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
  });
  await validateResponse(response);
  //disable reason: idk how to fix this and still get the correct type cause typescript
  // i have to look into this
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const projectPost: ProjectPostT = await response.json();
  return projectPost;
}
