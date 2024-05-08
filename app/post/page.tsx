import ContentBox from "@/components/content-box";

export default function Post() {
  const someText: string =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ea, consequatur quibusdam earum reiciendis voluptatem commodi, possimus nemo facere consequuntur ipsum placeat minus excepturi nulla, doloremque quia! Molestiae, natus quasi.";
  const numberOfDiscussions: number = 2;

  return (
    <div>
      {/* Main 'post' render */}
      <ContentBox>
        <h1>Post title</h1>
        <p>{someText}</p>
      </ContentBox>
      {/* Discussions */}
      <h2>{numberOfDiscussions} Replies</h2>
      <ContentBox>
        <p>{someText}</p>
        <div>Reactions</div>
        <button>Reply</button>
      </ContentBox>
      <ContentBox>
        <p>{someText}</p>
        <div>Reactions</div>
        <button>Reply</button>
      </ContentBox>
      <h2>Your reply</h2>
      <ContentBox>
        <p>User input text...</p>
      </ContentBox>
      <button>Post your answer</button>
    </div>
  );
}
