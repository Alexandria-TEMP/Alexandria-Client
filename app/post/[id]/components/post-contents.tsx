import ContentBox from "@/components/content-box";
import HeaderSubtle from "@/components/header-subtle";
import Tag from "@/components/tag";
import Link from "next/link";

// TODO get post id from props
// TODO load content based on post id
export default function PostContents() {
  const someText: string =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ea, consequatur quibusdam earum reiciendis voluptatem commodi, possimus nemo facere consequuntur ipsum placeat minus excepturi nulla, doloremque quia! Molestiae, natus quasi.";

  return (
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
  );
}
