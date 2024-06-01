export async function getCompletionTypes() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return ["Community Discussion", "Formal Feedback"];
}

export async function getFeedbackTypes() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return ["Ideation (to begin)", "Ongoing", "Completed"];
}

export async function getPostTypes() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return ["Project", "Question", "Reflection"];
}
