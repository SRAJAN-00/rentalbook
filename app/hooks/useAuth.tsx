"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    if (!session) {
      return null; // Will redirect via useEffect
    }

    return <>{children}</>;
  };

  return { session, status, isLoading, AuthGuard };
}
