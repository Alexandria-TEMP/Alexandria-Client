export async function getDiscussionData(id: string) {
  // TODO
  // const res = await fetch();

  return {
    anonymous: false,
    author: {
      email: "mariecurie@tudelft.nl",
      firstName: "Marie",
      institution: "TU Delft",
      lastName: "Curie",
    },
    createdAt: "11 May 2024",
    deleted: false,
    deletedAt: "-",
    replies: [],
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut ducimus amet ex qui eius corrupti reiciendis, quibusdam suscipit, aspernatur ipsum. Reprehenderit libero molestias nostrum eum sed? Illo, quidem ad.",
    updatedAt: "11 May 2024",
  };
}

// TODO parameter type should include all data needed for a discussion
export async function uploadDiscussion(text: string, id: string) {
  // TODO
  return Promise.resolve();
}
