"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import OptimizedBookList from "../components/OptimizedBookList";
import DashboardLayout from "../components/DashboardLayout";
import LoadingState from "../components/Loading";

// Client-side component for better authentication handling
export default function BooksPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  // Show loading while checking authentication
  if (status === "loading") {
    return (
      <LoadingState 
        message="Checking authentication..."
        size="lg"
        color="blue"
      />
    );
  }

  // Don't render anything if not authenticated (will redirect)
  if (!session) {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Books</h1>
        <p className="text-gray-600">
          Discover and rent books from our collection
        </p>
      </div>

      {/* OptimizedBookList handles its own loading and data fetching */}
      <OptimizedBookList initialBooks={[]} />
    </DashboardLayout>
  );
}
