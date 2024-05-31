// import { CardHeader, Chip } from "@nextui-org/react";
// import HeaderSubtle from "@/components/header-subtle";
// // import PostLinks from "./post-links";
// // import ContributeDropdown from "./contribute-dropdown";
// import { IdProp } from "@/lib/id-prop";
// import { getMergeRequestData } from "@/lib/api-calls/merge-request-api";
// import PostLinks from "@/post/[postId]/components/post-body/post-links";

// /**
//  * Header for merge request contents card. Uses CardHeader, so it must be child of a Card.
//  * Includes title, main metadata, and action buttons.
//  *
//  * @param postId Post ID
//  */
// export default async function MergeRequestCardHeader({
//   id,
//   hideContribute,
// }: IdProp & {
//   hideContribute?: boolean;
// }) {
//   const data = await getMergeRequestData(id);

//   return (
//     <>
//       {/* Title */}
//       <CardHeader>
//         <h1 className="font-semibold">{data.newPostTitle}</h1>
//       </CardHeader>

//       {/* (part of) Metadata */}
//       <CardHeader className="-mt-4 flex gap-12">
//         <PostLinks postId={postId} />
//         {!hideContribute && <ContributeDropdown />}

//         <div className="grow" />

//         <div className="flex-col">
//           <HeaderSubtle>Post type</HeaderSubtle>
//           <Chip>{data.postType}</Chip>
//         </div>
//         <div className="flex-col">
//           <HeaderSubtle>Status</HeaderSubtle>
//           <Chip>{data.status}</Chip>
//         </div>
//         <div className="flex-col">
//           <HeaderSubtle>
//             Created on {data.createdAt.toLocaleDateString()}
//           </HeaderSubtle>
//           <HeaderSubtle>
//             Last update on {data.updatedAt.toLocaleDateString()}
//           </HeaderSubtle>
//         </div>
//       </CardHeader>
//     </>
//   );
// }
