"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import DashboardContent from "../components/DashboardContent";
import { LoadingState } from "../components/Loading";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return <LoadingState fullScreen message="Loading dashboard..." />;
  }

  if (!session) {
    return null; // Will redirect
  }

  return (
    <DashboardLayout
      title="Dashboard"
      subtitle={`Welcome back, ${session.user?.name}! Here's what's happening with your reading journey.`}
    >
      <DashboardContent />
    </DashboardLayout>
  );
}
