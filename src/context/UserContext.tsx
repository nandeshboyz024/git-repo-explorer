import { createContext, useContext, useState } from "react";
import { GithubUser } from "../types";

interface UserContextType {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;

  users: GithubUser[];
  setUsers: React.Dispatch<React.SetStateAction<GithubUser[]>>;

  hasMore: boolean;
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>;
}


const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [query, setQuery] = useState<string>("");
  const [users, setUsers] = useState<GithubUser[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);

  return (
    <UserContext.Provider value={{ query, setQuery, users, setUsers, hasMore, setHasMore }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used inside UserProvider");
  }
  return context;
};
