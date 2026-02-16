"use client";

import { useAuthUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { PropsWithChildren, useEffect } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  const { user, isLoading } = useAuthUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  });

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spinner className="size-10" />
      </div>
    );
  }

  return children;
}
