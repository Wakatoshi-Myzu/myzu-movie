"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { usePopularTvSeries } from "@/hooks/use-tv-series";
import { TvCard } from "@/components/tv/tv-card";

export function TvSection() {
  const { data: tvShows, isLoading, error } = usePopularTvSeries();

  if (error || (!isLoading && !tvShows?.results.length)) {
    return null;
  }

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="nb-on-primary nb-shadow-sm flex size-8 items-center justify-center rounded-lg border-[2.5px] border-[var(--nb-shadow)] bg-primary">
            <Icon icon="mdi:television" className="size-4 text-primary-foreground" />
          </div>
          <h2 className="text-xl font-black uppercase tracking-tight">Popular TV Shows</h2>
        </div>
        <Link
          href="/tv"
          className="nb-border-sm nb-shadow-sm inline-flex items-center gap-1 rounded-lg bg-background px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_var(--nb-shadow)]"
        >
          VIEW ALL
          <Icon icon="mdi:arrow-right" className="size-4" />
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[2/3] rounded-t-[9px] border-b-[3px] border-[var(--nb-shadow)] bg-muted" />
              <div className="space-y-2 p-3">
                <div className="h-4 w-3/4 rounded bg-muted" />
                <div className="h-3 w-1/2 rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {tvShows!.results.slice(0, 6).map((show, index) => (
            <TvCard key={show.id} show={show} index={index} />
          ))}
        </div>
      )}
    </section>
  );
}
