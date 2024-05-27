export type FormData = {
  mrTitle: string; // hihi mister title
  collaborators: string[];
  anonymous: boolean;
  originalPostId: string;
  updatedTitle: string;
  updatedCompletionStatus: string;
  updatedFeedbackPreferences: string;
  updatedScientificFields: string[];
};

// : SubmitHandler<FormData>
export function submit(formData: FormData) {
  alert(
    "Title: " +
      formData.mrTitle +
      "\n" +
      "Collaborators: " +
      formData.collaborators.map((a) => a.toString()).toString() +
      "\n" +
      "Is anonymous: " +
      formData.anonymous +
      "\n" +
      "Original Post Id: " +
      formData.originalPostId +
      "\n" +
      "Updated Title: " +
      formData.updatedTitle +
      "\n" +
      "Fields: " +
      formData.updatedScientificFields.map((a) => a.toString()).toString() +
      "\n" +
      "Updated Completion: " +
      formData.updatedCompletionStatus +
      "\n" +
      "Updated Feedback: " +
      formData.updatedFeedbackPreferences,
  );
}
