"use client";

import { useSession } from "next-auth/react";
import { Hero } from "./components/Hero";

export default function Home() {
  const { data: session, status } = useSession();

  // If user is authenticated, show them the landing page with hero
  // but the buttons will redirect appropriately
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Hero />
      <div className="flex gap-6 justify-center mb-12 flex-wrap"></div>
    </div>
  );
}
