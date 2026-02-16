"use client";

import { Header } from "@/components/header";
import { PropsWithChildren } from "react";
import { useAuthUser } from "@/lib/auth";
import { Spinner } from "@/components/ui/spinner";

export default function RootLayout({ children }: PropsWithChildren) {
  const { isLoading } = useAuthUser();

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spinner className="size-10" />
      </div>
    );
  }

  return (
    <>
      <Header />
      {children}
    </>
  );
}
