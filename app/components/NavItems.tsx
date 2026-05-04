"use client";

import Link from "next/link";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Button from "./ModernButton";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/books", label: "Browse Books" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/rentals", label: "My Rentals" },
];

type LinkActionButton = {
  kind: "link";
  href: string;
  label: string;
  variant: "success" | "primary";
};

type ClickActionButton = {
  kind: "button";
  label: string;
  variant: "primary";
  onClick: () => void;
};

type ActionButton = LinkActionButton | ClickActionButton;

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    setIsMobileMenuOpen(false);
    await signOut({ callbackUrl: "/" });
  };

  const handleSignIn = () => {
    setIsMobileMenuOpen(false);
    router.push("/auth/signin");
  };

  const actionButtons: ActionButton[] = session
    ? [
        { kind: "link", href: "/api/seed", label: "Seed Data", variant: "success" },
        {
          kind: "button",
          label: "Sign Out",
          variant: "primary",
          onClick: handleSignOut,
        },
      ]
    : [
        { kind: "link", href: "/api/seed", label: "Seed Data", variant: "success" },
        {
          kind: "button",
          label: "Sign In",
          variant: "primary",
          onClick: handleSignIn,
        },
      ];

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3">
              <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 shadow-sm" />
              <span className="text-lg font-bold tracking-tight text-slate-900">
                BookRental
              </span>
            </Link>

            <div className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-md px-3 py-2 text-sm transition-colors duration-150 ${
                      isActive
                        ? "bg-blue-50 font-medium text-blue-700"
                        : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            {actionButtons.map((button) =>
              button.kind === "button" ? (
                <Button
                  key={button.label}
                  variant={button.variant}
                  size="sm"
                  onClick={button.onClick}
                >
                  {button.label}
                </Button>
              ) : (
                <Button
                  key={button.label}
                  href={button.href}
                  variant={button.variant}
                  size="sm"
                >
                  {button.label}
                </Button>
              ),
            )}
          </div>

          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
              className="rounded-md p-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="space-y-1 px-3 pb-4 pt-3">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-md px-3 py-2.5 text-sm ${
                    isActive
                      ? "bg-blue-50 font-medium text-blue-700"
                      : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="space-y-2 pb-1 pt-4">
              {actionButtons.map((button) =>
                button.kind === "button" ? (
                  <Button
                    key={button.label}
                    variant={button.variant}
                    size="sm"
                    className="w-full"
                    onClick={button.onClick}
                  >
                    {button.label}
                  </Button>
                ) : (
                  <Button
                    key={button.label}
                    href={button.href}
                    variant={button.variant}
                    size="sm"
                    className="w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {button.label}
                  </Button>
                ),
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
