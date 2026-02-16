"use client";

import Link from "next/link";
import SearchBar from "./searchbar";
import { Button } from "./ui/button";
import { useAuthUser } from "@/lib/auth";
import HeaderUser from "./header-user";

export function Header() {
  const { user } = useAuthUser();

  return (
    <div className="flex items-center justify-center gap-10 py-4 border-b">
      <h1 className="font-bold text-xl">Anime</h1>
      <SearchBar />
      <div className="flex items-center gap-3">
        {user ? (
          <HeaderUser user={user} />
        ) : (
          <div className="flex items-center gap-3">
            <Button className="rounded-xl">
              <Link href={"/login"}>Login</Link>
            </Button>
            <Button variant="outline" className="rounded-xl">
              <Link href={"/register"}>Register</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
