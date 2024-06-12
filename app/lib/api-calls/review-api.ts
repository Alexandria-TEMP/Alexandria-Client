import { BranchReviewT, idType } from "../types/api-types";

/**
 * TODO jsdoc when properly implemented
 */
export async function getReviewData(id: idType): Promise<BranchReviewT> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  if (id == 1)
    return {
      id,
      feedback:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in felis et nibh commodo suscipit aliquam et tellus. Integer mattis mauris vitae sem laoreet vulputate. Maecenas iaculis lacus at convallis bibendum. Nunc porttitor auctor aliquam. Aliquam erat volutpat. Morbi dictum scelerisque mattis. Sed vel dolor lorem. Sed posuere, risus nec tincidunt ultricies, augue libero porta nibh, in venenatis elit risus vel ante. Maecenas placerat nisl non lacus viverra lobortis. Fusce pharetra finibus nisl. Sed sit amet ultrices massa. Proin molestie tincidunt sapien, ut aliquam felis fermentum vel. Interdum et malesuada fames ac ante ipsum primis in faucibus. \n\n Sed cursus ante nulla, sed laoreet nisl sagittis eget. Donec tempus mi ut nulla cursus pellentesque. Integer rhoncus lectus eu massa facilisis, vel vestibulum lacus porta. Nam sapien diam, commodo vel ante sit amet, laoreet laoreet nisl. Phasellus sit amet elit a nulla laoreet iaculis nec sed mi. Maecenas varius purus leo, vitae mattis urna iaculis eget. Vestibulum non fermentum metus, sed interdum metus. Cras rutrum in lacus ac suscipit. Sed posuere consequat tellus eget malesuada. Aliquam congue neque pharetra risus condimentum, ac placerat dolor interdum. Nulla eu leo a lorem hendrerit condimentum. Suspendisse ultrices, ante at accumsan rutrum, mauris ipsum vulputate nisl, at posuere enim velit vel velit. Curabitur lobortis quis neque pharetra pellentesque. Nulla vehicula diam at neque vehicula pellentesque. Maecenas tristique leo vitae molestie finibus.",
      memberID: 0,
      branchReviewDecision: "rejected",
      branchID: 0,
      createdAt: "02 June 2024",
    };
  else
    return {
      id,
      feedback:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in felis et nibh commodo suscipit aliquam et tellus. Integer mattis mauris vitae sem laoreet vulputate. Maecenas iaculis lacus at convallis bibendum. Nunc porttitor auctor aliquam. Aliquam erat volutpat. Morbi dictum scelerisque mattis. Sed vel dolor lorem. Sed posuere, risus nec tincidunt ultricies, augue libero porta nibh, in venenatis elit risus vel ante. Maecenas placerat nisl non lacus viverra lobortis. Fusce pharetra finibus nisl. Sed sit amet ultrices massa. Proin molestie tincidunt sapien, ut aliquam felis fermentum vel. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
      memberID: 1,
      branchReviewDecision: "approved",
      branchID: 0,
      createdAt: "02 June 2024",
    };
}
