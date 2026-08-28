"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { usePopularMovies } from "@/hooks/use-popular-movies";
import { useNowPlayingMovies } from "@/hooks/use-now-playing-movies";
import { useUpcomingMovies } from "@/hooks/use-upcoming-movies";
import { MovieGrid } from "@/components/movie/movie-grid";
import { MovieGridSkeleton } from "@/components/movie/movie-grid-skeleton";

type MovieSectionType = "popular" | "now-playing" | "upcoming";

interface MovieSectionProps {
  type: MovieSectionType;
  title: string;
  href?: string;
}

const SECTION_CONFIG: Record<
  MovieSectionType,
  { hook: "popular" | "nowPlaying" | "upcoming"; icon: string }
> = {
  popular: { hook: "popular", icon: "mdi:trending-up" },
  "now-playing": { hook: "nowPlaying", icon: "mdi:play-circle" },
  upcoming: { hook: "upcoming", icon: "mdi:calendar-clock" },
};

export function MovieSection({ type, title, href }: MovieSectionProps) {
  const config = SECTION_CONFIG[type];

  const popularQuery = usePopularMovies();
  const nowPlayingQuery = useNowPlayingMovies();
  const upcomingQuery = useUpcomingMovies();

  const queries: Record<MovieSectionType, typeof popularQuery> = {
    popular: popularQuery,
    "now-playing": nowPlayingQuery,
    upcoming: upcomingQuery,
  };

  const { data, isLoading, error } = queries[type];

  if (error) return null;

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="nb-on-primary nb-shadow-sm flex size-8 items-center justify-center rounded-lg border-[2.5px] border-[var(--nb-shadow)] bg-primary">
            <Icon icon={config.icon} className="size-4 text-primary-foreground" />
          </div>
          <h2 className="text-xl font-black uppercase tracking-tight">{title}</h2>
        </div>
        {href && (
          <Link
            href={href}
            className="nb-border-sm nb-shadow-sm inline-flex items-center gap-1 rounded-lg bg-background px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_var(--nb-shadow)]"
          >
            VIEW ALL
            <Icon icon="mdi:arrow-right" className="size-4" />
          </Link>
        )}
      </div>

      {isLoading ? (
        <MovieGridSkeleton count={6} />
      ) : (
        data && <MovieGrid movies={data.results.slice(0, 12)} />
      )}
    </section>
  );
}
