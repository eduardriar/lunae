"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { User, UserType } from "../generated/prisma/client";

type UserWithType = User & { userType: UserType };

type UsersContextValue = {
  therapists: UserWithType[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

const UsersContext = createContext<UsersContextValue | undefined>(undefined);

export function UsersProvider({ children }: { children: ReactNode }) {
  const [therapists, setTherapists] = useState<UserWithType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTherapists = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/therapists");
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const data: UserWithType[] = await res.json();
      setTherapists(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTherapists();
  }, []);

  return (
    <UsersContext.Provider
      value={{ therapists, loading, error, refetch: fetchTherapists }}
    >
      {children}
    </UsersContext.Provider>
  );
}

export function useUsers() {
  const ctx = useContext(UsersContext);
  if (!ctx) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return ctx;
}
