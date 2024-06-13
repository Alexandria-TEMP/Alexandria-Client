// TODO there are endpoints for all these functions, however we also have the respective types, hardcoded from the API spec
// my initial idea was to use the endpoints so that the options would always match those stored on the server
// and would not need to be manually maintained on the front end
// however we do kind of need the hardcoded values since they are the types of fields of other types?
// (postT contains a postTypeT object in it)
// so we either set those to string and rely on the server providing correct values, although some hardcoding for creating post/vs project post will have to be done
// or we dont get them from the server and use the hardcoded values from the API spec
// ALSO if these arent API calls anymore, they should probably not be in a file named "tags-api"

import {
  PostTypeT,
  ProjectCompletionStatusT,
  ProjectFeedbackPreferenceT,
} from "../types/api-types";

/**
 * OLD: Function that fetches all possible completion types for a post from the back-end
 * Function that returns all values of ProjectCompletionStatusT as an array
 * @returns the list of options as an array of strings
 */
export function getCompletionTypes(): ProjectCompletionStatusT[] {
  // TODO is there a way to get this automatically instead of me manually creating the array?
  return ["idea", "ongoing", "completed"];
}

/**
 * OLD: Function that fetches all possible feedback types for a post from the back-end
 * Function that returns all values of ProjectCompletionStatusT as an array
 * @returns the list of options as an array of strings
 */
export function getFeedbackTypes(): ProjectFeedbackPreferenceT[] {
  return ["discussion feedback", "formal feedback"];
}

/**
 * OLD: Function that fetches all possible post types for a post from the back-end
 * Function that returns all values of ProjectCompletionStatusT as an array
 * @returns the list of options as an array of strings
 */
export function getPostTypes(): PostTypeT[] {
  return ["project", "question", "reflection"];
}
