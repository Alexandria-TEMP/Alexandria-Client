export const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Validates the response and throws an error if any are found
 */
export async function validateResponse(res: Response) {
  if (res.ok) return;

  const message =
    ((await res.json()) as { error: string }).error ??
    res.headers.get("error") ??
    undefined;

  throw new Error(`status: ${res.status}, message: ${message}`);
}
