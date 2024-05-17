/**
 * Gets data for a Post given their ID.
 *
 * @async
 * @param id Post ID
 */
export default async function getPostData(id: string) {
  try {
    const file = await fetch("http://localhost:8000/");
    const blob = await file.blob();
    const html = await blob.text();
    return {
      title: "Post title",
      status: "Open for review",
      collaborators: ["1", "2"],
      createdAt: "10 May 2024",
      currentVersion: {
        id: "1",
        discussions: ["1", "1", "1", "1"],
      },
      id: id,
      postType: "Reflection",
      scientificFieldTags: [
        "Computer Science",
        "Mathematics",
        "Theory of computation",
      ],
      updatedAt: "11 May 2024",
      contents: html,
    };
  } catch (error) {
    console.log(error);
    return {
      title: "Post title",
      status: "Open for review",
      collaborators: ["1", "2"],
      createdAt: "10 May 2024",
      currentVersion: {
        id: "1",
        discussions: ["1", "1", "1", "1"],
      },
      id: id,
      postType: "Reflection",
      scientificFieldTags: [
        "Computer Science",
        "Mathematics",
        "Theory of computation",
      ],
      updatedAt: "11 May 2024",
      contents: undefined,
    };
  }
}
