"use client";

import { api } from "@/lib/axios";
import { useState, useEffect } from "react";

export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  role: string;
  image: string;
} | null;

export async function getUser(): Promise<User> {
  try {
    const res = await api.get("/api/user");
    return res.data;
  } catch {
    return null;
  }
}

export function useAuthUser() {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUser().then((userData) => {
      setUser(userData);
      setIsLoading(false);
    });
  }, []);
  return { user, isLoading };
}
