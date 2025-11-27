import { githubRequestResult } from "../types";

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export async function githubRequest<T>(url:string):Promise<githubRequestResult<T>> {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json"
    }
  });

  // extract headers
  const rate = {
    limit: Number(response.headers.get("X-RateLimit-Limit")),
    remaining: Number(response.headers.get("X-RateLimit-Remaining")),
    reset: Number(response.headers.get("X-RateLimit-Reset")),
  };

  const data:T= await response.json();
  return { data, rate, status:response.status};
}
