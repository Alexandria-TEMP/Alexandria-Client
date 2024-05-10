import ContentBox from "@/components/content-box";
import Link from "next/link";
import AuthorCard from "./components/author-card";
import PostCardMini from "./components/post-card-mini";
import ThemeSwitcher from "@/components/theme-switcher";
import Tag from "@/components/tag";
import HeaderSubtle from "@/components/header-subtle";

export default function Post() {
  const someText: string =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ea, consequatur quibusdam earum reiciendis voluptatem commodi, possimus nemo facere consequuntur ipsum placeat minus excepturi nulla, doloremque quia! Molestiae, natus quasi.";
  const numberOfDiscussions: number = 2;

  return (
    <div className="flex flex-row space-x-6">
      {/* TODO put this in a header instead of here */}
      <ThemeSwitcher />
      {/* Main body */}
      <div className="flex flex-col space-y-4">
        {/* Main 'post' render */}
        <ContentBox>
          {/* Title */}
          <h1 className="font-semibold">Post title</h1>
          {/* (part of) Metadata */}
          <div className="flex flex-row space-x-12">
            <div className="flex-col">
              <HeaderSubtle>Created on 8 May 2024</HeaderSubtle>
              <HeaderSubtle>Last update on 10 May 2024</HeaderSubtle>
            </div>
            <div className="flex-col">
              <HeaderSubtle>Post type</HeaderSubtle>
              <Tag>Research Project</Tag>
            </div>
            <div className="flex-col">
              <HeaderSubtle>Status</HeaderSubtle>
              <Tag>Open for review</Tag>
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
        <h2>About</h2>
        <h3>Scientific fields</h3>
        <div className="flex flex-row flex-wrap gap-x-3 gap-y-2">
          <Tag>Computer Science</Tag>
          <Tag>Theory of computation</Tag>
          <Tag>Mathematical optimization</Tag>
        </div>
        <h3>Forked from</h3>
        <PostCardMini title="Other post's title" status="Peer reviewed" />
        <h3>Authors</h3>
        <AuthorCard name="Jane Doe" contribution="Investigation" />
        <AuthorCard name="John Doe" contribution="Methodology" />
        <h3>Collaborators</h3>
        <AuthorCard name="Jane Doe" contribution="Investigation" />
        <AuthorCard name="John Doe" contribution="Methodology" />
        <AuthorCard name="Jane Doe" contribution="Investigation" />
        <AuthorCard name="John Doe" contribution="Methodology" />
      </div>
    </div>
  );
}
