# Git Repo Explorer

A React + TypeScript application to explore GitHub users and their repositories.  
It allows searching for GitHub users, viewing user details, and exploring their repositories in a clean and interactive interface.

---

## 🌐 Live Version

[https://git-repo-explore.netlify.app/](https://git-repo-explore.netlify.app/)

---

## 🔧 Running the Project Locally

```bash
git clone https://github.com/nandeshboyz024/git-repo-explorer.git
cd git-repo-explorer
````


## 🔐 Environment Variables (.env)

The project uses a **.env** file to securely store sensitive values such as the GitHub Personal Access Token.

Create a `.env` file in the project root and add:

```env
REACT_APP_GITHUB_TOKEN=YOUR_TOKEN_KEY
```

This token is used for authenticated GitHub API requests and helps increase the rate limit.

---

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.





## ⚡ State Management Approach

I chose **React Context API** for managing global state across the app.

* This allows sharing user data, search results, and rate-limit information without prop drilling.
* I also created **custom hooks** for API calls, which handle data fetching, loading states, and error handling.
* This combination keeps the app **lightweight and scalable**, avoiding the overhead of external state management libraries like Redux.

---

## 🛠 Implemented Features

* Search GitHub users by username.
* View detailed information about a user.
* Explore public repositories with filtering and sorting options.
* Data fetching (users/repositories) via GitHub API with **pagination** (30 results at a time; load more with a button).
* **Custom hooks** for data fetching and error handling with status codes.
* **Context API** stores user data, search results
* **Rate limit monitoring**: displays remaining API requests; if exceeded, redirects to a rate-limit-exceeded page.
* Full **client-side routing**, including direct links (works in live version thanks to `_redirects` on Netlify).
* API secrets are hidden using **environment variables**.
* Deployed on **Netlify**.

---

## 📝 TypeScript Interfaces

```ts
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
```
