"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/dashboard",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"
        />
      </svg>
    ),
  },
  {
    id: "books",
    label: "Browse Books",
    href: "/books",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
  {
    id: "my-rentals",
    label: "My Rentals",
    href: "/dashboard/rentals",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
    ),
  },
  {
    id: "favorites",
    label: "Favorites",
    href: "/dashboard/favorites",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
  },
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0  lg:hidden" onClick={onToggle} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen bg-neutral-100 border-gray-200 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-56 lg:translate-x-0 flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 h-15 bg-white border-b border-r rounded-t-xl border-gray-300">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6  rounded-sm flex items-center justify-center">
              <span className="text-white text-sm font-bold">R</span>
            </div>
            <span className="text-xl font-bold text-gray-900">RentalBook</span>
          </div>
          <button
            onClick={onToggle}
            className="lg:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 border border-gray-300  rounded-b-xl overflow-y-auto">
          {menuItems.map((item, idx) => {
            const isActive = pathname === item.href;
            return (
              <motion.div
                key={item.id}
                className="relative"
                transition={{}}
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
              >
                <AnimatePresence>
                  {hovered === idx && !isActive && (
                    <motion.div
                      layoutId="navhover"
                      className="absolute inset-0 rounded-xl bg-gray-200 pointer-events-none"
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </AnimatePresence>

                <Link
                  href={item.href}
                  className={`flex items-center group relative text-gray-700 space-x-3 px-2 py-1 rounded-xl z-10 ${
                    isActive
                      ? "bg-blue-50 text-blue-700 border-l-4 border-blue-700"
                      : ""
                  }`}
                  onClick={() => {
                    // Close mobile menu when item is clicked
                    if (window.innerWidth < 1024) {
                      onToggle();
                    }
                  }}
                >
                  <motion.span
                    className={`relative z-10 ${
                      isActive
                        ? "text-blue-700"
                        : "text-gray-400 group-hover:text-gray-900"
                    }`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {item.icon}
                  </motion.span>
                  <span className="relative z-10  group-hover:text-gray-900 font-medium">
                    {item.label}
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* User Profile Section */}
      </aside>
    </>
  );
}
