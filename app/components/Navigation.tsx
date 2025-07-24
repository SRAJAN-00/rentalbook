"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Button from "./ModernButton";

export default function Navigation() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                📚 RentalBook
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="animate-pulse bg-gray-200 h-8 w-20 rounded"></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              📚 RentalBook
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link
                href="/books"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Browse Books
              </Link>
              {session && (
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  My Dashboard
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <span className="text-gray-700 text-sm">
                  Welcome, {session.user?.name}
                </span>
                <Button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  variant="outline"
                  size="sm"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/signin">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button variant="primary" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
