"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { usePopularMovies } from "@/hooks/use-popular-movies";
import { useNowPlayingMovies } from "@/hooks/use-now-playing-movies";
import { useUpcomingMovies } from "@/hooks/use-upcoming-movies";
import { MovieGrid } from "@/components/movie/movie-grid";
import { MovieGridSkeleton } from "@/components/movie/movie-grid-skeleton";
import { Icon } from "@iconify/react";
import type { PaginatedResponse, MovieListItem } from "@/lib/tmdb/mapper";
import { UseQueryResult } from "@tanstack/react-query";

const CATEGORY_CONFIG = {
  popular: {
    title: "Popular Movies",
    subtitle: "Trending and most watched films right now",
    icon: "mdi:trending-up",
  },
  "now-playing": {
    title: "Now Playing",
    subtitle: "Currently showing in theaters",
    icon: "mdi:play-circle",
  },
  upcoming: {
    title: "Upcoming Movies",
    subtitle: "Films coming soon to theaters",
    icon: "mdi:calendar-clock",
  },
} as const;

type Category = keyof typeof CATEGORY_CONFIG;

interface MovieListProps {
  category: Category;
}

export function MovieList({ category }: MovieListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const config = CATEGORY_CONFIG[category];

  const queries: Record<Category, UseQueryResult<PaginatedResponse<MovieListItem>>> = {
    popular: usePopularMovies(page),
    "now-playing": useNowPlayingMovies(page),
    upcoming: useUpcomingMovies(page),
  };

  const { data, isLoading, error } = queries[category];

  function setPage(newPage: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`/movies?${params.toString()}`);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 space-y-3">
        <div className="flex items-center gap-3">
          <div className="nb-on-primary nb-shadow-sm flex size-8 items-center justify-center rounded-lg border-[2.5px] border-[var(--nb-shadow)] bg-primary">
            <Icon icon={config.icon} className="size-4 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tight sm:text-3xl">
            {config.title}
          </h1>
        </div>
        <p className="text-muted-foreground">{config.subtitle}</p>
      </div>

      {isLoading ? (
        <MovieGridSkeleton count={18} />
      ) : error ? (
        <div className="nb-card mx-auto max-w-md bg-card p-8 text-center">
          <Icon icon="mdi:alert-circle-outline" className="mx-auto mb-4 size-12 text-destructive" />
          <p className="mb-2 text-lg font-black uppercase">Failed to Load Movies</p>
          <p className="mb-4 text-sm text-muted-foreground">
            Something went wrong. Please try again later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="nb-btn nb-on-primary bg-primary px-5 py-2.5 text-sm text-primary-foreground"
          >
            TRY AGAIN
          </button>
        </div>
      ) : data && data.results.length > 0 ? (
        <>
          <MovieGrid movies={data.results} />

          {data.totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-3">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page <= 1}
                className="nb-border-sm nb-shadow-sm inline-flex items-center gap-1 rounded-lg bg-background px-4 py-2 text-sm font-black uppercase tracking-wider transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_var(--nb-shadow)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[3px_3px_0px_var(--nb-shadow)]"
              >
                <Icon icon="mdi:chevron-left" className="size-4" />
                PREV
              </button>

              <span className="nb-badge bg-muted px-4 py-2 text-sm font-black">
                {page} / {data.totalPages}
              </span>

              <button
                onClick={() => setPage(page + 1)}
                disabled={page >= data.totalPages}
                className="nb-border-sm nb-shadow-sm inline-flex items-center gap-1 rounded-lg bg-background px-4 py-2 text-sm font-black uppercase tracking-wider transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_var(--nb-shadow)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[3px_3px_0px_var(--nb-shadow)]"
              >
                NEXT
                <Icon icon="mdi:chevron-right" className="size-4" />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="nb-card mx-auto max-w-md bg-card p-8 text-center">
          <Icon icon="mdi:movie-open-outline" className="mx-auto mb-4 size-12 text-muted-foreground" />
          <p className="mb-2 text-lg font-black uppercase">No Movies Found</p>
          <p className="text-sm text-muted-foreground">
            There are no movies in this category right now.
          </p>
        </div>
      )}
    </div>
  );
}
