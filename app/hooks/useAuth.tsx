"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoadingState } from "../components/Loading";

export function useAuthRedirect(redirectTo: string = "/auth/signin") {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(redirectTo);
    }
  }, [status, router, redirectTo]);

  return { session, status, isLoading: status === "loading" };
}

export function useRequireAuth() {
  const { session, status, isLoading } = useAuthRedirect();
  
  const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    if (isLoading) {
      return <LoadingState fullScreen message="Authenticating..." />;
    }

    if (!session) {
      return null; // Will redirect via useEffect
    }

    return <>{children}</>;
  };

  return { session, status, isLoading, AuthGuard };
}
