import { useState } from "react";
import RateLimitIndicator from "../components/RateLimitIndicator";
import { githubRequest } from "../api/github.ts";
import UserList from "../components/UserList";
import {RateLimit, GithubUserSearchResponse } from "../types";
import toast, { Toaster } from "react-hot-toast";
import RateLimitExceeded from "./RateLimitExceeded.tsx";
import { useUserContext } from "../context/UserContext.tsx";

export default function Home() {
  const { query, setQuery, users, setUsers, hasMore, setHasMore } = useUserContext();
  const [rate, setRate] = useState<RateLimit | null>(null);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [rateLimited, setRateLimited] = useState<boolean>(false);
  const [searched, setSearched] = useState<boolean>(false);


  const perPage = 30;

  const searchUsers = async (newSearch = true) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      toast.error("Search query cannot be empty!");
      return;
    }
    setSearched(true);
    setLoading(true);
    setRateLimited(false);

    try {
      const currentPage = newSearch ? 1 : page;
      const url = `https://api.github.com/search/users?q=${query}&page=${currentPage}&per_page=${perPage}`;
      const { data, rate, status } = await githubRequest<GithubUserSearchResponse>(url);

      if(status===403){
        setRateLimited(true);
        return;
      }

      if (newSearch) {
        setUsers([]);
        setHasMore(false);
        const newUsers = data.items || [];
        setUsers(newUsers);
        setPage(2);
        setHasMore(newUsers.length < data.total_count);
      } else {
          setUsers(prev => {
            const updatedUsers = [...prev, ...(data.items || [])];
            setHasMore(updatedUsers.length < data.total_count); // update here based on updatedUsers
            return updatedUsers;
          });
        setPage(prev => prev + 1);
      }
      setRate(rate);
    } catch (err) {
      console.log("Error searching users: ", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchClick = () => searchUsers(true);
  const handleLoadMore = () => searchUsers(false);


  if(rateLimited) return <RateLimitExceeded/>

  console.log(hasMore);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20px",
      }}
    >
      <Toaster position="top-center" />
      <div
        style={{
          width: "100%",
          textAlign: "center",
          marginBottom: "15px",
        }}
      >
        <h2>Search GitHub Users</h2>

        <input
          type="text"
          placeholder="Search username..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: "8px",
            width: "100%",
            maxWidth: "250px",
          }}
        />

        <button
          onClick={handleSearchClick}
          disabled={loading}
          style={{ marginLeft: "10px", padding: "8px 16px" }}
        >
          {loading ? "Searching..." : "Search"}
        </button>

        <div style={{ margin: "10px auto", width: "250px" }}>
          <RateLimitIndicator rate={rate} />
        </div>
      </div>
      {(searched || users.length>0) && 
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          height: "400px",
          overflowY: "auto",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <UserList users={users} />

        {hasMore && (
          <button
            onClick={handleLoadMore}
            disabled={loading}
            style={{ marginLeft:"10%", marginTop: "10px", width: "80%", height:'40px', borderRadius:'5px'}}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        )}
        </div>
      }
    </div>
  );
}
