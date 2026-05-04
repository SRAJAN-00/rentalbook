"use client";

import Link from "next/link";
import { dummyBooks } from "../../data/books";
import BookCover from "./BookCover";
import { Hero } from "./Hero";

type Book = (typeof dummyBooks)[number];

const popularBooks: Book[] = [
  dummyBooks[3],
  dummyBooks[4],
  dummyBooks[5],
  dummyBooks[6],
  dummyBooks[7],
  dummyBooks[8],
].filter((book): book is Book => Boolean(book));

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <Hero />

      <main>
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Popular Reads
            </h2>
            <p className="mt-3 text-slate-600">
              Handpicked titles our readers are renting right now.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {popularBooks.map((book) => (
              <article key={book.isbn} className="group">
                <Link
                  href={`/books/${encodeURIComponent(book.isbn)}`}
                  className="block"
                  aria-label={`View details for ${book.title}`}
                >
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
            &copy; {new Date().getFullYear()} BookRental. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
