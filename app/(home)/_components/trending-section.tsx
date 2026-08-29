"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { useTrendingMovies } from "@/hooks/use-trending-movies";
import { MovieGrid } from "@/components/movie/movie-grid";
import { MovieGridSkeleton } from "@/components/movie/movie-grid-skeleton";

export function TrendingSection() {
  const [timeWindow, setTimeWindow] = useState<"day" | "week">("day");
  const { data, isLoading, error } = useTrendingMovies(timeWindow);

  if (error) return null;

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="nb-on-primary nb-shadow-sm flex size-8 items-center justify-center rounded-lg border-[2.5px] border-[var(--nb-shadow)] bg-primary">
            <Icon icon="mdi:fire" className="size-4 text-primary-foreground" />
          </div>
          <h2 className="text-xl font-black uppercase tracking-tight">
            Trending
          </h2>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setTimeWindow("day")}
            className={`nb-border-sm nb-shadow-sm inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_var(--nb-shadow)] ${
              timeWindow === "day"
                ? "nb-on-primary bg-primary text-primary-foreground"
                : "bg-background"
            }`}
          >
            <Icon icon="mdi:weather-sunny" className="size-4" />
            Today
          </button>
          <button
            onClick={() => setTimeWindow("week")}
            className={`nb-border-sm nb-shadow-sm inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_var(--nb-shadow)] ${
              timeWindow === "week"
                ? "nb-on-primary bg-primary text-primary-foreground"
                : "bg-background"
            }`}
          >
            <Icon icon="mdi:calendar-week" className="size-4" />
            This Week
          </button>
        </div>
      </div>

      {isLoading ? (
        <MovieGridSkeleton count={6} />
      ) : (
        data && <MovieGrid movies={data.results.slice(0, 12)} />
      )}
    </section>
  );
}
