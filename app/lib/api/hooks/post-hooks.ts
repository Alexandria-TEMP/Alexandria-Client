"use client";

import { PostUnionT, idPostUnionT } from "@/lib/types/post-union";
import useSWR, { SWRResponse } from "swr";
import fetchPostData from "../services/post-api";

/**
 * Fetches post or project post data in a unified object
 * @returns
 *    data: post and optionally project post data (or undefined if not loaded),
 *    error: error thrown by fetcher (or undefined),
 *    isLoading: if there's an ongoing request and no "loaded data"
 */
export function usePostData(id: idPostUnionT): SWRResponse<PostUnionT, Error> {
  return useSWR(id, fetchPostData);
}
