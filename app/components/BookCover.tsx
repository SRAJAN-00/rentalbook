"use client";

import Image from "next/image";

interface BookCoverProps {
  title: string;
  author?: string;
  genre?: string;
  imageUrl?: string;
  className?: string;
  compact?: boolean;
}

const coverThemes = [
  {
    bg: "from-rose-500 via-orange-500 to-amber-400",
    accent: "bg-white/25",
    line: "bg-white/80",
  },
  {
    bg: "from-indigo-600 via-violet-600 to-fuchsia-500",
    accent: "bg-white/20",
    line: "bg-white/75",
  },
  {
    bg: "from-emerald-500 via-teal-500 to-cyan-500",
    accent: "bg-white/20",
    line: "bg-white/75",
  },
  {
    bg: "from-slate-800 via-slate-700 to-stone-500",
    accent: "bg-white/15",
    line: "bg-white/70",
  },
  {
    bg: "from-pink-500 via-rose-500 to-red-500",
    accent: "bg-white/20",
    line: "bg-white/75",
  },
];

function pickTheme(seed: string) {
  const value = seed
    .split("")
    .reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return coverThemes[value % coverThemes.length];
}

export default function BookCover({
  title,
  author,
  genre,
  imageUrl,
  className = "",
  compact = false,
}: BookCoverProps) {
  const theme = pickTheme(`${title}-${author ?? ""}-${genre ?? ""}`);

  if (imageUrl) {
    return (
      <div
        className={`relative overflow-hidden rounded-xl border border-slate-200 bg-slate-100 ${className}`}
      >
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br ${theme.bg} ${className}`}
    >
      <div className={`absolute -right-8 -top-8 h-24 w-24 rounded-full ${theme.accent} blur-2xl`} />
      <div className={`absolute -left-6 bottom-4 h-20 w-20 rounded-full ${theme.accent} blur-2xl`} />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_40%),linear-gradient(to_bottom,rgba(255,255,255,0.06),rgba(0,0,0,0.22))]" />

      <div className="relative flex h-full w-full flex-col justify-between p-4 text-white">
        <div className="flex items-center justify-between gap-2">
          <div className="h-2.5 w-12 rounded-full bg-white/80" />
          <div className={`h-2.5 w-2.5 rounded-full ${theme.line}`} />
        </div>

        <div className="flex-1 flex flex-col justify-center gap-2">
          <div className="space-y-1">
            <div className="max-w-[92%] text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-white/80">
              {genre || "Book"}
            </div>
            <div
              className={`font-semibold leading-tight ${
                compact ? "text-sm" : "text-base sm:text-lg"
              } line-clamp-3`}
            >
              {title}
            </div>
            {author && (
              <div className="text-xs text-white/75 line-clamp-1">
                by {author}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-end justify-between gap-2 text-[0.65rem] uppercase tracking-[0.28em] text-white/70">
          <span>RentalBook</span>
          <span className="rounded-full border border-white/25 px-2 py-1 text-[0.55rem] tracking-[0.24em] text-white/85">
            READ
          </span>
        </div>
      </div>
    </div>
  );
}
