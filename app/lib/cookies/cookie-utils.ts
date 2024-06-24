import { setCookie, deleteCookie, getCookie } from "cookies-next";
import { postMembersToken } from "../api/services/member-api";

/**
 * Method that sets all session cookies, upon user login
 * @param userId the id of the member object
 * @param userName the name of the member
 * @param userEmail the email of the member
 * @param accessToken the access token to be used with backend requests
 * @param refreshToken the refresh token to refresh the access token if user has not logged out
 * @param accessExp expiration date for the accesss token, provided in uint64 unix time as per API spec
 * @param refreshExp expiration date for the refresh token, provided in uint64 unix time as per API spec
 */
export function setSessionCookies(
  userId: string,
  userName: string,
  userEmail: string,
  accessToken: string,
  refreshToken: string,
  accessExp: number,
  refreshExp: number,
) {
  // user id, name, email valid until end of session or logout
  setCookie("user-id", userId, {
    path: "/",
  });
  setCookie("user-name", userName, {
    path: "/",
  });
  setCookie("user-email", userEmail, {
    path: "/",
  });
  setCookie("access-token", accessToken, {
    // expires: new Date(accessExp * 1000),
    path: "/",
  });
  setCookie("refresh-token", refreshToken, {
    expires: new Date(refreshExp * 1000),
    path: "/",
  });
}

/**
 * Function that deletes all session cookies
 */
export function destroySessionCookies() {
  deleteCookie("user-id");
  deleteCookie("user-name");
  deleteCookie("user-email");
  deleteCookie("access-token");
  deleteCookie("refresh-token");
}

// TODO apparently i have been lied to by the internet and "getCookie" only works in client components
// thus the get cookie with refresh method only works inside client components
/**
 * Get a cookie and check if access token needs the be refreshed, and if there is a refresh token to do so
 * @param name of the cookie
 * @returns the cookie
 */
export async function getCookieWithRefresh(name: string) {
  /* first check if there is a refresh token, if there isnt all data must be collected again */
  if (!getCookie("refresh-token"))
    throw Error("Refresh token expired. Please log in again.");

  /* if there is a refresh token, but the access token has expired, we can refresh (reset) the access token */
  if (!getCookie("access-token")) {
    // trust me bro i know the token is there, i check for it earlier
    // ... ignore potential concurrency issues
    const tokens = await postMembersToken(getCookie("refresh-token") as string);

    // dont reset them, make sure they are gone first
    deleteCookie("access-token");
    deleteCookie("refresh-token");

    // set the new values
    setCookie("access-token", tokens.accessToken, {
      expires: new Date(tokens.accessExp * 1000),
      path: "/",
    });
    setCookie("refresh-token", tokens.refreshToken, {
      expires: new Date(tokens.refreshExp * 1000),
      path: "/",
    });
  }

  // return the original cookie
  return getCookie(name);
}
