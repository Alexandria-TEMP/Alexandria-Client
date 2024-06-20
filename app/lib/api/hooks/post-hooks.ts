"use client";

import { PostUnionT, idPostUnionT } from "@/lib/types/post-union";
import useSWR, { SWRResponse } from "swr";
import { fetchPostData } from "../services/post-api";
import { idT } from "@/lib/types/api-types";
import { fetchScientificFieldContainer } from "../services/fields-api";

/**
 * Fetches post or project post data in a unified object
 * @param id the id of the post or project post whose data we are getting
 * @returns
 *    data: post and optionally project post data (or undefined if not loaded),
 *    error: error thrown by fetcher (or undefined),
 *    isLoading: if there's an ongoing request and no "loaded data"
 */
export function usePostData(id: idPostUnionT): SWRResponse<PostUnionT, Error> {
  return useSWR(id, fetchPostData);
}

/**
 * Function that fetches all data about a post, including the list of scientific field tag ids
 * This is necessary to conditionally fetch scientific fields, after post data is looaded
 * @param id post/project post id
 * @returns
 *    data: scientific fields IDs, post, and optionally project post data (or undefined if not loaded),
 *    error: error thrown by fetcher (or undefined),
 *    isLoading: if there's an ongoing request and no "loaded data"
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
