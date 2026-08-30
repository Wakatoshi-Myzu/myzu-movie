"use client";

import { useState } from "react";
import { usePopularTvSeries, useAiringTodayTvSeries, useOnTheAirTvSeries, useTopRatedTvSeries } from "@/hooks/use-tv-series";
import { TvCard } from "@/components/tv/tv-card";
import { Icon } from "@iconify/react";

interface TvSeriesListProps {
  category: string;
}

const CATEGORY_CONFIG = {
  popular: { icon: "mdi:trending-up" },
  "airing-today": { icon: "mdi:calendar-today" },
  "on-the-air": { icon: "mdi:television-play" },
  "top-rated": { icon: "mdi:star" },
} as const;

export function TvSeriesList({ category }: TvSeriesListProps) {
  const [page, setPage] = useState(1);

  const popularQuery = usePopularTvSeries(page);
  const airingTodayQuery = useAiringTodayTvSeries(page);
  const onTheAirQuery = useOnTheAirTvSeries(page);
  const topRatedQuery = useTopRatedTvSeries(page);

  const queryMap: Record<string, typeof popularQuery> = {
    popular: popularQuery,
    "airing-today": airingTodayQuery,
    "on-the-air": onTheAirQuery,
    "top-rated": topRatedQuery,
  };

  const { data, isLoading, isFetching } = queryMap[category] || popularQuery;

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} className="nb-card overflow-hidden bg-card">
            <div className="aspect-[2/3] w-full animate-pulse border-b-[3px] border-[var(--nb-shadow)] bg-muted" />
            <div className="p-3 space-y-2">
              <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
              <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!data?.results.length) {
    return (
      <div className="nb-card mx-auto max-w-md bg-card p-8 text-center">
        <Icon icon="mdi:television-off" className="mx-auto mb-4 size-12 text-muted-foreground" />
        <p className="mb-2 text-lg font-black uppercase">No TV Shows Found</p>
        <p className="text-sm text-muted-foreground">
          There are no TV shows in this category right now.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {data.results.map((show, index) => (
          <TvCard key={show.id} show={show} index={index} />
        ))}
      </div>

      {data.totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-3">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
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
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= data.totalPages}
            className="nb-border-sm nb-shadow-sm inline-flex items-center gap-1 rounded-lg bg-background px-4 py-2 text-sm font-black uppercase tracking-wider transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_var(--nb-shadow)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[3px_3px_0px_var(--nb-shadow)]"
          >
            NEXT
            <Icon icon="mdi:chevron-right" className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
}
