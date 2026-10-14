/**
 * Parse a response body only when it is JSON.
 * Safari throws "The string did not match the expected pattern" from
 * Response.json() when the body is HTML (error page, challenge, index.html).
 */
export async function readJsonResponse(response) {
  const type = response.headers.get('content-type') || ''
  if (!/\bapplication\/json\b/i.test(type) && !/\btext\/json\b/i.test(type)) return null
  try {
    return await response.json()
  } catch {
    return null
  }
}
