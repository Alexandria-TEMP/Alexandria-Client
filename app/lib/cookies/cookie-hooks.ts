"use client";

import { getCookieWithRefresh } from "./cookie-utils";
import useSWR from "swr";

/**
 * Get a cookie and refresh the access and refresh tokens if necessary
 * @param name of the cookie
 * @returns the cookie if it exists, undefined else
 */
export function useCookieWithRefresh(name: string) {
  const cookie = useSWR(name, getCookieWithRefresh, {
    refreshInterval: 10 * 60 * 1000, // every 10 mins, set kinda randomly
  });
  return cookie.data;
}
