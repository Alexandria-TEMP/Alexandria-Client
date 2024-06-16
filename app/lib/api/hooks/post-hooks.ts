"use client";

import { PostUnionT, idPostUnionT } from "@/lib/types/post-union";
import useSWR, { SWRResponse } from "swr";
import fetchPostData from "../services/post-api";

/**
 * Live update post fetching for client side components
 * @param id the id of the post or project post whose data we are getting
 * @returns SWR response containing data, isLoading and error states
 */
export function useFetchPost(id: idPostUnionT): SWRResponse<PostUnionT, Error> {
  return useSWR(id, fetchPostData);
}
