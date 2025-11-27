import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RepoList from "../components/RepoList.js";
import RateLimitIndicator from "../components/RateLimitIndicator.js";
import { githubRequest } from "../api/github.ts";
import { GithubRepo, RateLimit, UserDetails } from "../types.ts";
import PageNotFound from "./PageNotFound.tsx";
import './../styles/Filter.css';
import RateLimitExceeded from "./RateLimitExceeded.tsx";
import Spinner from "../components/Spinner.js";

export default function UserRepos() {
  const { username } = useParams();

  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [rate, setRate] = useState<RateLimit | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [rateLimited, setRateLimited] = useState<boolean>(false);


  const [page, setPage] = useState<number>(1);
  const perPage = 30;
  const [reposLoading, setReposLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const [languageFilter, setLanguageFilter] = useState<string>("All");
  const [sortOrder, setSortOrder] = useState<"none" | "stars" | "updated" | "name">("none");


const languages = Array.from(
  new Set(repos.map((r) => r.language).filter((lang): lang is string => !!lang))
);


  const filteredRepos = repos
    .filter((repo) => languageFilter === "All" || repo.language === languageFilter)
    .sort((a, b) => {
      switch (sortOrder) {
        case "stars":
          return b.stargazers_count - a.stargazers_count;
        case "updated":
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });


  useEffect(() => {
    async function fetchUser() {
      if (!username) return;

      setLoading(true);
      setNotFound(false);
      setRateLimited(false);

      try {
        const url = `https://api.github.com/users/${username}`;
        const { data, rate, status } = await githubRequest<UserDetails>(url);

        if (status === 404) {
          setNotFound(true);
          return;
        }

        if (status === 403) {
          setRateLimited(true);
          return;
        }

        setUserDetails(data);
        setRate(rate);

      } catch (err) {
        console.log("Error fetching user:", err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [username]);

  async function loadRepos(initial = false) {
    if (!username) return;

    setReposLoading(true);

    try {
      const currentPage = initial ? 1 : page;

      const url = `https://api.github.com/users/${username}/repos?page=${currentPage}&per_page=${perPage}`;
      const { data, rate, status } = await githubRequest<GithubRepo[]>(url);

      console.log(data);
      if(status===403){
        setRateLimited(true);
        return;
      }
      
      if (initial) {

        setRepos(data || []);
        setPage(2);
      } else {
        setRepos((prev) => [...prev, ...(data || [])]);
        setPage((prev) => prev + 1);
      }

      setHasMore(data.length === perPage);
      setRate(rate);
    } catch (err) {
      console.log("Error loading repos:", err);
    } finally {
      setReposLoading(false);
    }
  }

  if (loading) return <Spinner/>;
  if (notFound) return <PageNotFound />;
  if (rateLimited) return <RateLimitExceeded/>;

  return (
    <div style={{ padding: 20 }}>
     <div style={{color:'white'}}>
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
        <div style={{ width: "250px" }}>
      <RateLimitIndicator rate={rate} />
      </div>
     </div>
     <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "30px",
          marginTop: "20px",
        }}
      >
        <img
          src={userDetails?.avatar_url}
          alt="avatar"
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />

        <div>
          <h2 style={{ margin: 0, fontSize: "1.5rem", color: "#ccc" }}>
            @{userDetails?.login}
          </h2>
          <h3 style={{ margin: "5px 0", fontSize: "1.3rem", fontWeight: 500, color: "#fff" }}>
            {userDetails?.name}
          </h3>
          <p style={{ margin: "8px 0", color: "#ddd" }}>{userDetails?.bio}</p>

          <div style={{ marginTop: "10px", fontSize: "0.95rem", color: "#aaa" }}>
            <span>Followers: {userDetails?.followers}</span>
            <span> | </span>
            <span>Following: {userDetails?.following}</span>
          </div>
          <div style={{ marginTop: "10px", fontSize: "0.95rem", color: "#aaa" }}> 
            <span>Public Repositories: {userDetails?.public_repos}</span>
          </div>
        </div>
      </div>

      {repos.length === 0 && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          {userDetails?.public_repos === 0 ? (
            <p style={{ color: "#ccc", fontSize: "1.1rem" }}>
              No Public Repositories
            </p>
          ) : (
            <button
              style={{
                color: "black",
                padding: "10px 20px",
                cursor: reposLoading ? "not-allowed" : "pointer",
                opacity: reposLoading ? 0.6 : 1,
              }}
              onClick={() => loadRepos(true)}
              disabled={reposLoading}
            >
              {reposLoading ? "Loading Repos..." : "Show Repositories"}
            </button>
          )}
        </div>
      )}


    </div>

      {repos.length > 0 && (
        <div style={{marginLeft:'25%'}}>
        <div className="filter-container">
          <label>
            Language:
            <select
              value={languageFilter}
              onChange={(e) => setLanguageFilter(e.target.value)}
            >
              <option value="All">All</option>
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </label>

          <label>
            Sort by:
            <select
              value={sortOrder}
              onChange={(e) =>
                setSortOrder(e.target.value as "none" | "stars" | "updated" | "name")
              }
            >
              <option value="none">None</option>
              <option value="stars">Stars ↓</option>
              <option value="updated">Last Updated ↓</option>
              <option value="name">Name ↑</option>
            </select>
          </label>
        </div>
        </div>
      )}

      {repos.length > 0 &&
        <div style={{width:'80%', marginLeft:'10%'}}>
          <RepoList repos={filteredRepos} />
       </div>
       }

      {hasMore && (
        <div style={{ textAlign: "center", marginTop: "15px" }}>
          <button
            onClick={() => loadRepos(false)}
            disabled={reposLoading}
            style={{
              width: "100%",
              maxWidth: "400px",
              padding: "10px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            {reposLoading ? "Loading..." : "Load More"}
          </button>
        </div>

      )}
    </div>
  );
}
