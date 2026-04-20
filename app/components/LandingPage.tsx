"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { motion } from "motion/react";
import { dummyBooks } from "../../data/books";
import BookCover from "./BookCover";

const popularBooks = [
  dummyBooks[3],
  dummyBooks[4],
  dummyBooks[5],
  dummyBooks[6],
  dummyBooks[7],
  dummyBooks[8],
].filter(Boolean);

const navItems = [
  { label: "Home", href: "/" },
  { label: "Browse Books", href: "/books" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "My Rentals", href: "/dashboard/rentals" },
];

export default function LandingPage() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm">
              <span className="text-sm font-bold">📘</span>
            </div>
            <span className="text-lg font-semibold tracking-tight">
              BookRental
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-slate-700 transition hover:text-slate-950"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/seed-test"
              className="hidden rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 sm:inline-flex"
            >
              Seed Data
            </Link>
            {session ? (
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Sign Out
              </button>
            ) : (
              <Link
                href="/auth/signin"
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>

      <main>
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <div className="max-w-3xl">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="mb-4 text-sm font-medium text-slate-500"
              >
                Discover and rent books from our collection.
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.05 }}
                className="max-w-3xl font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.04em] text-slate-950 sm:text-6xl lg:text-7xl"
              >
                Your Digital Library Awaits
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.12 }}
                className="mt-6 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg"
              >
                Browse thoughtful picks, rent in minutes, and keep your reading
                life organized from one calm dashboard.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.18 }}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <Link
                  href="/books"
                  className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-medium text-slate-900 transition hover:border-slate-400 hover:bg-slate-50"
                >
                  Browse Books
                </Link>
                <Link
                  href="#popular-books"
                  className="text-sm font-medium text-slate-700 transition hover:text-slate-950"
                >
                  Explore Collection →
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        <section
          id="browse-books"
          className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
        >
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">
                Browse Books
              </p>
              <h2 className="mt-2 font-serif text-3xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-4xl">
                Featured books from the collection
              </h2>
            </div>
            <Link
              href="/books"
              className="text-sm font-medium text-slate-700 transition hover:text-slate-950"
            >
              View all books →
            </Link>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {popularBooks.map((book) => (
              <article key={book.isbn} className="group">
                <Link href="/books" className="block">
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
                    <BookCover
                      title={book.title}
                      author={book.author}
                      genre={book.genre}
                      imageUrl={book.imageUrl}
                      className="h-[320px] w-full rounded-none"
                    />
                  </div>
                  <div className="pt-4">
                    <h3 className="text-lg font-semibold text-slate-950">
                      {book.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      by {book.author}
                    </p>
                    <p className="mt-4 text-sm font-medium text-slate-700">
                      View Details
                    </p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex flex-wrap gap-6 text-sm text-slate-700">
            <Link href="#" className="transition hover:text-slate-950">
              About
            </Link>
            <Link href="#" className="transition hover:text-slate-950">
              Terms
            </Link>
            <Link href="#" className="transition hover:text-slate-950">
              Privacy
            </Link>
            <Link href="#" className="transition hover:text-slate-950">
              Contact
            </Link>
          </div>
          <p className="text-sm text-slate-500">
            © 2024 BookRental. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
