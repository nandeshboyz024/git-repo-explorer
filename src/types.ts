export interface RateLimit{
    limit:number;
    remaining:number;
    reset:number;
}

export interface githubRequestResult<T>{
    data:T;
    rate:RateLimit;
    status:number;
}

export interface GithubUserSearchResponse{
    total_count:number;
    incomplete_results:boolean;
    items:GithubUser[];
}

export interface GithubUser{
    id:number;
    login:string;
    avatar_url:string;
    html_url?:string;
}

export interface UserDetails{
    id:number;
    login:string;
    avatar_url:string;
    name:string|null;
    bio:string|null;
    public_repos:number;
    followers:number;
    following:number;
}

export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
}
