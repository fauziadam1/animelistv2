"use client";

import { api } from "./axios";
import { useState, useEffect } from "react";

export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  image: string;
  role: string;
} | null;

export function useGetUser() {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await api.get("/api/me");
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUser();
  }, []);

  return { user, isLoading };
}
