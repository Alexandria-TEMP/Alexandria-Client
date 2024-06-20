"use client";

import { PostUnionT, idPostUnionT } from "@/lib/types/post-union";
import useSWR, { SWRResponse } from "swr";
import {
  fetchDataForPostOfUnkownType,
  fetchPostData,
} from "../services/post-api";
import { ScientificFieldTagT, idT } from "@/lib/types/api-types";
import {
  fetchScientificFieldContainer,
  fetchScientificFieldsFromContainer,
} from "../services/fields-api";
import { fetchDiscussionContainer } from "../services/discussion-api";

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
export function usePostAndScientificFieldData(
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

/**
 * Fetches post or project post data in a unified object in addition to
 * the post's list of scientificFields and how many discussions are associated
 * with it. Intended for use in PostPreviewCard.
 * @param id the id of the post or project post whose data we are getting
 * @returns
 *    data: post and optionally project post data (or undefined if not loaded),
 *    error: error thrown by fetcher (or undefined),
 *    isLoading: if there's an ongoing request and no "loaded data"
 */
export function usePostPreviewData(id: idT): SWRResponse<
  PostUnionT & {
    scientificFields: ScientificFieldTagT[];
    numDiscussions: number;
  },
  Error
> {
  return useSWR({ id }, async ({ id }) => {
    const postUnion = await fetchDataForPostOfUnkownType(id);
    const scientificFields = await fetchScientificFieldsFromContainer(
      postUnion.post.scientificFieldTagContainerID,
    );
    const numDiscussions = (
      await fetchDiscussionContainer(postUnion.post.discussionContainerID)
    ).discussionIDs.length;

    return { ...postUnion, scientificFields, numDiscussions };
  });
}
