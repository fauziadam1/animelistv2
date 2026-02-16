"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { api } from "@/lib/axios";
import { LogOutIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { useState } from "react";
import { constants } from "buffer";
import { Spinner } from "./ui/spinner";

export default function HeaderUser({
  user,
}: {
  user: {
    name: string;
    username: string;
    email: string;
    image?: string | null;
    role: string;
  };
}) {
  const [isLoading, setIsLoadinga] = useState(false);

  const handleLogout = async () => {
    setIsLoadinga(true);
    try {
      await api.post("/api/logout");

      toast.success("Logout success");
      window.location.href = "/";
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const message = err?.response?.message ?? err.message ?? "Logout failed";
      toast.error(message);
      setIsLoadinga(false);
    }
  };
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="w-10 h-10 border cursor-pointer">
            {user.image && <AvatarImage src={user.image} alt={user.name} />}
            <AvatarFallback className="font-semibold">
              {user.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="translate-x-11">
          <DropdownMenuGroup>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault();
              handleLogout();
            }}
            className="cursor-pointer"
            variant="destructive"
          >
            {isLoading ? (
              <Spinner />
            ) : (
              <LogOutIcon className="text-destructive" />
            )}
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
