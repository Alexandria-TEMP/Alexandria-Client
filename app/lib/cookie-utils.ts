import { setCookie, deleteCookie } from "cookies-next";

/**
 * Method that sets all session cookies, upon user login
 * @param userId the id of the member object
 * @param userName the name of the member
 * @param userEmail the email of the member
 * @param accessToken the access token to be used with backend requests
 * @param refreshToken the refresh token to refresh the access token if user has not logged out
 */
export function setSessionCookies(
  userId: string,
  userName: string,
  userEmail: string,
  accessToken: string,
  refreshToken: string,
) {
  setCookie("user-id", userId, {
    maxAge: 15 * 60, // 15 mins
    path: "/",
  });
  setCookie("user-name", userName, {
    maxAge: 15 * 60, // 15 mins
    path: "/",
  });
  setCookie("user-email", userEmail, {
    maxAge: 15 * 60, // 15 mins
    path: "/",
  });
  setCookie("access-token", accessToken, {
    maxAge: 15 * 60 * 60, // 15 mins
    path: "/",
  });
  setCookie("refresh-token", refreshToken, {
    maxAge: 15 * 60,
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
