import ContentBox from "@/components/content-box";
import Link from "next/link";
import AuthorCard from "./components/author-card";
import PostCardMini from "./components/post-card-mini";

export default function Post() {
  const someText: string =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ea, consequatur quibusdam earum reiciendis voluptatem commodi, possimus nemo facere consequuntur ipsum placeat minus excepturi nulla, doloremque quia! Molestiae, natus quasi.";
  const numberOfDiscussions: number = 2;

  return (
    <div className="flex flex-row space-x-6">
      {/* Main body */}
      <div className="flex flex-col space-y-4">
        {/* Main 'post' render */}
        <ContentBox>
          {/* Title */}
          <h1 className="font-semibold">Post title</h1>
          {/* (part of) Metadata */}
          <div className="flex flex-row space-x-12">
            <div className="flex-col">
              <h3>Created on 8 May 2024</h3>
              <h3>Last update on 10 May 2024</h3>
            </div>
            <div className="flex-col">
              <h3>Post type</h3>
              {/* TODO tag */}
              <p>Research Project</p>
            </div>
            <div className="flex-col">
              <h3>Status</h3>
              {/* TODO tag */}
              <p>Open for review</p>
            </div>
            {/* TODO buttons */}
            {/* ? There's probably a more user-friendly name for this... */}
            <Link href={"/post/merge-requests"}>Merge Requests</Link>
            {/* ! Either contribute or review, depending on status */}
            <button>Contribute/Review</button>
            <button>Fork</button>
          </div>
          {/* Contents */}
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
      {/* Sidebar */}
      <div className="min-w-72">
        <h1>About</h1>
        <h2>Scientific fields</h2>
        <div className="flex flex-row">
          {/* TODO tags */}
          <p>Computer Science</p>
          <p>Theory of computation</p>
          <p>Mathematical optimization</p>
        </div>
        <h2>Forked from</h2>
        <PostCardMini title="Other post's title" status="Peer reviewed" />
        <h2>Authors</h2>
        <AuthorCard name="Jane Doe" contribution="Investigation" />
        <AuthorCard name="John Doe" contribution="Methodology" />
        <h2>Collaborators</h2>
        <AuthorCard name="Jane Doe" contribution="Investigation" />
        <AuthorCard name="John Doe" contribution="Methodology" />
        <AuthorCard name="Jane Doe" contribution="Investigation" />
        <AuthorCard name="John Doe" contribution="Methodology" />
      </div>
    </div>
  );
}
