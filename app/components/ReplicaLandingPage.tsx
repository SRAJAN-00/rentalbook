"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { dummyBooks } from "../../data/books";

const heroBooks = [dummyBooks[0], dummyBooks[1], dummyBooks[2]];

const stats = [
  {
    value: `${dummyBooks.length}+`,
    label: "titles on the shelf",
    icon: (
      <path
        d="M5 4.5h11a2.5 2.5 0 0 1 2.5 2.5v10.5M5 4.5A2.5 2.5 0 0 0 2.5 7v10.5A2.5 2.5 0 0 0 5 20h11a2.5 2.5 0 0 0 2.5-2.5V7A2.5 2.5 0 0 0 16 4.5H5Zm1.5 5h6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    value: `${new Set(dummyBooks.map((book) => book.genre)).size}`,
    label: "genres to explore",
    icon: (
      <path
        d="M4.5 5.5h4.2v13H4.5m10.8-13H19.5v13h-4.2M8.7 5.5h2.6v13H8.7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    value: `from $${Math.min(...dummyBooks.map((book) => book.rentalPrice)).toFixed(2)}`,
    label: "to start reading",
    icon: (
      <path
        d="M6 7.5h10.2a2.3 2.3 0 0 1 2.3 2.3v7.2A2.3 2.3 0 0 1 16.2 19H6a2.3 2.3 0 0 1-2.3-2.3V9.8A2.3 2.3 0 0 1 6 7.5Zm.2 0V6.3A2.3 2.3 0 0 1 8.5 4h5a2.3 2.3 0 0 1 2.3 2.3v1.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
];

const navLinks = [
  { href: "#collection", label: "Collection" },
  { href: "#how-it-works", label: "How it works" },
];

export default function ReplicaLandingPage() {
  return (
    <div className="min-h-screen bg-[#f6efdf] text-neutral-950">
      <header className="px-6 pt-6 lg:px-10">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-6">
          <Link href="/" className="text-[1.75rem] font-semibold tracking-[-0.05em] leading-none">
            RENTALBOOK
          </Link>

          <nav className="hidden items-center gap-12 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[1.25rem] font-normal text-neutral-900/90 transition hover:text-neutral-950"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/auth/signin"
            className="inline-flex h-14 items-center rounded-full border-2 border-neutral-900 px-7 text-[1.15rem] font-semibold tracking-[-0.01em] transition hover:bg-neutral-900 hover:text-[#f6efdf]"
          >
            Login
          </Link>
        </div>
      </header>

      <main className="px-6 pb-10 pt-10 lg:px-10 lg:pt-14">
        <section className="mx-auto grid max-w-[1280px] items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
          <div className="max-w-[620px]">
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="font-serif text-[4.4rem] leading-[0.9] tracking-[-0.065em] text-neutral-950 sm:text-[5.4rem] lg:text-[6.2rem]"
            >
              Borrow books
              <span className="block">without the noise</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.6, ease: "easeOut" }}
              className="mt-8 max-w-[560px] text-[1.25rem] leading-[1.45] text-neutral-900/90 sm:text-[1.45rem]"
            >
              Discover and rent a vast collection of titles from various genres,
              delivered to your door.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16, duration: 0.6, ease: "easeOut" }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link
                href="/books"
                className="inline-flex h-14 items-center rounded-full bg-neutral-950 px-8 text-[1.05rem] font-semibold text-[#f6efdf] shadow-[0_16px_30px_rgba(20,20,20,0.18)] transition hover:translate-y-[-1px] hover:bg-neutral-800"
              >
                Browse collection
              </Link>
              <Link
                href="/auth/signup"
                className="inline-flex h-14 items-center rounded-full border-2 border-neutral-900 bg-transparent px-8 text-[1.05rem] font-semibold text-neutral-950 transition hover:bg-white/40"
              >
                Create account
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.75, ease: "easeOut" }}
            className="relative mx-auto h-[430px] w-full max-w-[700px] sm:h-[520px] lg:h-[540px]"
          >
            <div className="absolute left-3 top-14 h-[70%] w-[88%] rounded-[2rem] bg-white/45 shadow-[0_24px_70px_rgba(64,52,27,0.14)] backdrop-blur-xl ring-1 ring-white/60 sm:left-4 sm:top-16" />
            <div className="absolute left-0 top-20 h-[68%] w-[84%] rounded-[2rem] bg-gradient-to-br from-[#bcb7c3]/40 to-[#c6d8de]/45 blur-2xl" />

            <div className="absolute left-[10%] top-[22%] h-[56%] w-[29%] overflow-hidden rounded-[1.6rem] shadow-[0_18px_45px_rgba(25,18,10,0.28)] rotate-[-10deg]">
              <Image
                src={heroBooks[1].imageUrl}
                alt={heroBooks[1].title}
                fill
                sizes="(max-width: 1024px) 30vw, 220px"
                className="object-cover"
              />
            </div>

            <div className="absolute left-[33%] top-[39%] h-[43%] w-[32%] overflow-hidden rounded-[1.6rem] shadow-[0_20px_50px_rgba(25,18,10,0.3)] rotate-[7deg]">
              <Image
                src={heroBooks[2].imageUrl}
                alt={heroBooks[2].title}
                fill
                sizes="(max-width: 1024px) 32vw, 240px"
                className="object-cover"
              />
            </div>

            <div className="absolute right-[5%] top-[10%] h-[55%] w-[36%] overflow-hidden rounded-[1.6rem] shadow-[0_24px_60px_rgba(25,18,10,0.32)] rotate-[17deg]">
              <Image
                src={heroBooks[0].imageUrl}
                alt={heroBooks[0].title}
                fill
                sizes="(max-width: 1024px) 36vw, 280px"
                className="object-cover"
              />
            </div>

            <div className="absolute bottom-4 left-5 right-5 sm:bottom-6 sm:left-8 sm:right-8">
              <div className="h-px w-full bg-neutral-900/10" />
            </div>
          </motion.div>
        </section>

        <section className="mx-auto mt-12 max-w-[1280px] border-t border-neutral-900/10 pt-8 lg:mt-16 lg:pt-10">
          <div className="grid gap-7 lg:grid-cols-3 lg:gap-10">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-5 text-neutral-900">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-neutral-900/15 bg-[#f8f3e8] text-neutral-700">
                  <svg viewBox="0 0 24 24" className="h-7 w-7">
                    {stat.icon}
                  </svg>
                </div>
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-[2rem] leading-none tracking-[-0.06em]">
                      {stat.value}
                    </span>
                    <span className="text-[1.15rem] leading-tight text-neutral-900/90">
                      {stat.label}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
