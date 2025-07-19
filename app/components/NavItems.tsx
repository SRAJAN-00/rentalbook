"use client";

import Link from "next/link";
import { useState } from "react";
import Button from "./ModernButton";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/books", label: "Browse Books" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/rentals", label: "My Rentals" },
];

const actionButtons = [
  { href: "/api/seed", label: "✨ Seed Data", variant: "success" as const },
  { href: "#", label: "Sign In", variant: "primary" as const, isButton: true },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getButtonStyles = (style: string) => {
    const baseStyles =
      "px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200";
    if (style === "green") {
      return `${baseStyles} bg-green-600 text-white hover:bg-green-700`;
    }
    return `${baseStyles} bg-blue-600 text-white hover:bg-blue-700`;
  };

  return (
    <nav className="bg-gray-50 border border-red-500sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          {/* Left side: Logo + Navigation Links */}
          <div className="flex items-center space-x-8">
            {/* Logo/Brand */}
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl">📚</span>
              <span className="text-xl font-bold text-gray-900">
                BookRental
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 px-3 font-normal py-2 rounded-md text-sm  transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side: Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {actionButtons.map((button) =>
              button.isButton ? (
                <Button key={button.label} variant={button.variant} size="sm">
                  {button.label}
                </Button>
              ) : (
                <Button
                  key={button.href}
                  href={button.href}
                  variant={button.variant}
                  size="sm"
                >
                  {button.label}
                </Button>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600 p-2"
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <div className="pt-4 pb-2 space-y-2">
              {actionButtons.map((button) =>
                button.isButton ? (
                  <Button
                    key={button.label}
                    variant={button.variant}
                    size="sm"
                    className="w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {button.label}
                  </Button>
                ) : (
                  <Button
                    key={button.href}
                    href={button.href}
                    variant={button.variant}
                    size="sm"
                    className="w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {button.label}
                  </Button>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
