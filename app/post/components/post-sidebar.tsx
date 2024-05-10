import Tag from "@/components/tag";
import AuthorCard from "./author-card";
import PostCardMini from "./post-card-mini";

// TODO contents from props
export default function PostSidebar() {
  return (
    <div className="min-w-64">
      <h2>About</h2>
      <h3>Scientific fields</h3>
      <div className="flex flex-row flex-wrap gap-x-3 gap-y-2">
        <Tag>Computer Science</Tag>
        <Tag>Theory of computation</Tag>
        <Tag>Mathematical optimization</Tag>
      </div>

      <div className="h-4" />

      <h3>Forked from</h3>
      <PostCardMini title="Other post's title" status="Peer reviewed" />

      <div className="h-4" />

      <h3>Authors</h3>
      <div className="flex flex-col gap-y-2">
        <AuthorCard name="Jane Doe" subtitle="Investigation" />
        <AuthorCard name="John Doe" subtitle="Methodology" />
      </div>

      <div className="h-4" />

      <h3>Collaborators</h3>
      <div className="flex flex-col gap-y-2">
        <AuthorCard name="Jane Doe" subtitle="Investigation" />
        <AuthorCard name="John Doe" subtitle="Methodology" />
        <AuthorCard name="Jane Doe" subtitle="Investigation" />
        <AuthorCard name="John Doe" subtitle="Methodology" />
      </div>
    </div>
  );
}
