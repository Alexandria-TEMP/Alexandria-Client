import {
  postDiscussionRoot,
  postDiscussionReply,
} from "@/lib/api/services/discussion-api";
import {
  DiscussionCreationFormT,
  RootDiscussionCreationFormT,
  idT,
  ReplyDiscussionCreationFormtT,
} from "@/lib/types/api-types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

/**
 * Submit a root discussion, set loading and error msg
 * @param data form data, text and anonymous flag
 * @param containerID parent container to add discussion to
 * @param accessToken of the currently logged in user
 * @param setIsLoading setter for loading state of parent
 * @param setErrorMsg setter for error msg of parent
 * @param router refresh when done
 */
export async function rootDiscussionSubmitHandler(
  data: DiscussionCreationFormT,
  containerID: idT,
  accessToken: string | undefined,
  setIsLoading: (v: boolean) => void,
  setErrorMsg: (e: string | undefined) => void,
  router: AppRouterInstance,
) {
  try {
    if (!accessToken) throw new Error("Please log in to start a discussion.");
    setIsLoading(true);

    const rootDiscussionCreationForm: RootDiscussionCreationFormT = {
      containerID: containerID,
      discussion: data,
    };

    await postDiscussionRoot(rootDiscussionCreationForm, accessToken);
    setErrorMsg(undefined);
    setIsLoading(false);
    router.refresh();
    router.refresh();
  } catch (error) {
    alert("calling set error");

    if (error instanceof Error) {
      setErrorMsg(error.message);
    }
    setIsLoading(false);
  }
}

/**
 * Submit a reply discussion, set loading and error msg
 * @param data form data, text and anonymous flag
 * @param parentDiscussionID id of parent discussion to add reply to
 * @param accessToken of the currently logged in user
 * @param setIsLoading setter for loading state of parent
 * @param setErrorMsg setter for error msg of parent
 * @param router refresh when done
 */
export async function replyDiscussionSubmitHandler(
  data: DiscussionCreationFormT,
  parentDiscussionID: idT,
  accessToken: string | undefined,
  setIsLoading: (v: boolean) => void,
  setErrorMsg: (e: string | undefined) => void,
  router: AppRouterInstance,
) {
  try {
    if (!accessToken) throw new Error("Please log in to post a reply.");
    setIsLoading(true);

    const replyDiscussionCreationForm: ReplyDiscussionCreationFormtT = {
      parentID: parentDiscussionID,
      discussion: data,
    };

    await postDiscussionReply(replyDiscussionCreationForm, accessToken);
    await Promise.resolve(() => setTimeout(() => {}, 5000));
    setErrorMsg(undefined);

    // TODO ????? fix
    router.refresh();
    router.refresh();
    setIsLoading(false);
  } catch (error) {
    if (error instanceof Error) {
      setErrorMsg(error.message);
    }
    setIsLoading(false);
  }
}
