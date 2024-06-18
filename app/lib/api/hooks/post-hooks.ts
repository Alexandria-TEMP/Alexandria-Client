"use client";

import { PostUnionT, idPostUnionT } from "@/lib/types/post-union";
import useSWR, { SWRResponse } from "swr";
import fetchPostData from "../services/post-api";
import { idT } from "@/lib/types/api-types";
import { fetchScientificFieldContainer } from "../services/fields-api";

/**
 * Live update post fetching for client side components
 * @param id the id of the post or project post whose data we are getting
 * @returns SWR response containing data, isLoading and error states
 */
export function useFetchPost(id: idPostUnionT): SWRResponse<PostUnionT, Error> {
  return useSWR(id, fetchPostData);
}

/**
 * Function that fetches all data about a post, including the list of scientific field tag ids
 * This is necessary because if you need all of this information in a client component,
 * you will need to conditionally call the hook for scientific fields, depending on whether the data for the post is loaded
 * and react will complain a lot about this
 * @param id post/project post id
 * @returns SWR response containing post data, scientific field ids, is loading and erorr states
 */
export function useFetchPostWithTags(
  id: idPostUnionT,
): SWRResponse<PostUnionT & { scientificFieldTagIDs: idT[] }, Error> {
  return useSWR(id, async (id) => {
    const postData = await fetchPostData(id);
    const scientificFieldsContainer = await fetchScientificFieldContainer(
      postData.post.scientificFieldTagContainerID,
    );
    return {
      ...postData,
      scientificFieldTagIDs: scientificFieldsContainer.scientificFieldTagIDs,
    };
  });
}
