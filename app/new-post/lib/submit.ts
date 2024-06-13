import { baseUrl, validateResponse } from "@/lib/api-calls/api-common";
import {
  PostT,
  PostTypeT,
  ProjectCompletionStatusT,
  ProjectFeedbackPreferenceT,
  idT,
} from "@/lib/types/api-types";

export type FormType = {
  title: string;
  anonymous: boolean;
  authorMemberIDs: idT[];
  scientificFieldTagIDs: idT[];
  postType: PostTypeT;
  projectCompletionStatus: ProjectCompletionStatusT;
  projectFeedbackPreference: ProjectFeedbackPreferenceT;
  file: File | null;
};

type PostCreationFormT = {
  anonymous: boolean;
  authorMemberIDs: idT[];
  postType: PostTypeT;
  scientificFieldTags: idT[];
  title: string;
};

type ProjectPostCreationFormT = {
  postCreationForm: PostCreationFormT;
  projectCompletionStatus: ProjectCompletionStatusT;
  projectFeedbackPreference: ProjectFeedbackPreferenceT;
};

/**
 * Method that sends a POST request to the server to create a new post, currently only metadata
 * @param postCreationForm object containing post creation form data
 */
async function postPost(postCreationForm: PostCreationFormT) {
  const jsonPost = JSON.stringify(postCreationForm);
  const response = await fetch(baseUrl + "/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonPost,
  });
  await validateResponse(response);
  //disable reason: idk how to fix this and still get the correct type cause typescript
  // i have to look into this
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const newPost: PostT = await response.json();
  alert("New post created: " + newPost.id);
}

/**
 * Method that sends a POST request to the server to create a new project post, currently only metadata
 * @param postCreationForm object containing project post creation form data
 */
async function postProjectPost(
  projectPostCreationForm: ProjectPostCreationFormT,
) {
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
  const newProjectPost: PostT = await response.json();
  alert("New project post created: " + newProjectPost.id);
}

/**
 * TODO jsdoc when properly implemented
 */
export const submitHandler = async (
  data: FormType,
  setIsLoading: (v: boolean) => void,
  onError: () => void,
) => {
  try {
    setIsLoading(true);
    const postCreationForm = {
      anonymous: data.anonymous,
      authorMemberIDs: data.authorMemberIDs,
      postType: data.postType,
      scientificFieldTags: data.scientificFieldTagIDs,
      title: data.title,
    };
    const projectPostCreationForm = {
      projectCompletionStatus: data.projectCompletionStatus,
      projectFeedbackPreference: data.projectFeedbackPreference,
      postCreationForm: postCreationForm,
    };

    const fileData = new FormData();
    if (!data.file) throw new Error("Please submit a file");
    fileData.append("file", data.file);

    if (data.postType == "project")
      await postProjectPost(projectPostCreationForm);
    else await postPost(postCreationForm);

    setIsLoading(false);
  } catch (error) {
    setIsLoading(false);
    onError();
  }
};
