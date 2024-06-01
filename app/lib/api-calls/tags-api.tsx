/**
 * Function that fetches all possible completion types for a post from the back-end
 * @returns the list of options as an array of strings // TODO maybe return something like isLoading and error?
 */
export async function getCompletionTypes() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return ["Community Discussion", "Formal Feedback"];
}

/**
 * Function that fetches all possible feedback types for a post from the back-end
 * @returns the list of options as an array of strings // TODO maybe return something like isLoading and error?
 */
export async function getFeedbackTypes() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return ["Ideation (to begin)", "Ongoing", "Completed"];
}

/**
 * Function that fetches all possible post types for a post from the back-end
 * @returns the list of options as an array of strings // TODO maybe return something like isLoading and error?
 */
export async function getPostTypes() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return ["Project", "Question", "Reflection"];
}
