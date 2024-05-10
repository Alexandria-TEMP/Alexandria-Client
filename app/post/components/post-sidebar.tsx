import Tag from "@/components/tag";
import AuthorCard from "./author-card";
import PostCardMini from "./post-card-mini";

// TODO contents from props
export default function PostSidebar() {
  return (
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
      <AuthorCard name="Jane Doe" subtitle="Investigation" />
      <AuthorCard name="John Doe" subtitle="Methodology" />
      <h3>Collaborators</h3>
      <AuthorCard name="Jane Doe" subtitle="Investigation" />
      <AuthorCard name="John Doe" subtitle="Methodology" />
      <AuthorCard name="Jane Doe" subtitle="Investigation" />
      <AuthorCard name="John Doe" subtitle="Methodology" />
    </div>
  );
}
