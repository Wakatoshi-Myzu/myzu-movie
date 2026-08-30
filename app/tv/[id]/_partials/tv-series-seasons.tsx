"use client";

import { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { getPosterUrl } from "@/lib/tmdb/image";
import type { TvSeason } from "@/lib/tmdb/mapper";

interface TvSeriesSeasonsProps {
  seasons: TvSeason[];
  tvShowId: number;
}

export function TvSeriesSeasons({ seasons, tvShowId }: TvSeriesSeasonsProps) {
  const [showAll, setShowAll] = useState(false);
  const filteredSeasons = seasons.filter((s) => s.seasonNumber > 0);
  const displayedSeasons = showAll ? filteredSeasons : filteredSeasons.slice(0, 6);

  if (filteredSeasons.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="inline-block border-b-[3px] border-[var(--nb-shadow)] text-xl font-black uppercase tracking-tight">
          Seasons ({filteredSeasons.length})
        </h2>
        {filteredSeasons.length > 6 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="nb-border-sm nb-shadow-sm inline-flex items-center gap-1.5 rounded-lg bg-background px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_var(--nb-shadow)]"
          >
            <Icon icon={showAll ? "mdi:chevron-up" : "mdi:chevron-down"} className="size-4" />
            {showAll ? "Show Less" : "Show All"}
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {displayedSeasons.map((season) => (
          <div
            key={season.id}
            className="nb-card group bg-card"
          >
            <div className="flex gap-4 p-4">
              <div className="w-16 shrink-0 overflow-hidden rounded-t-[9px] border-b-[3px] border-[var(--nb-shadow)] bg-muted">
                {season.posterPath ? (
                  <Image
                    src={getPosterUrl(season.posterPath, "w185")}
                    alt={season.name}
                    width={64}
                    height={96}
                    className="w-full object-cover"
                  />
                ) : (
                  <div className="flex h-24 items-center justify-center">
                    <span className="text-xs font-black text-muted-foreground/50">
                      S{season.seasonNumber}
                    </span>
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1 space-y-1">
                <h3 className="font-black uppercase tracking-tight group-hover:text-primary">
                  {season.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="nb-badge bg-muted px-1.5 py-0.5 text-[10px] font-black text-foreground">
                    {season.episodeCount} Episode{season.episodeCount !== 1 ? "s" : ""}
                  </span>
                  {season.airDate && (
                    <span className="nb-badge bg-muted px-1.5 py-0.5 text-[10px] font-black text-foreground">
                      {new Date(season.airDate).getFullYear()}
                    </span>
                  )}
                  {season.voteAverage > 0 && (
                    <span className="nb-badge nb-on-yellow bg-yellow-400 px-1.5 py-0.5 text-[10px] font-black text-black">
                      ★ {season.voteAverage.toFixed(1)}
                    </span>
                  )}
                </div>
                {season.overview && (
                  <p className="line-clamp-2 text-xs text-muted-foreground">
                    {season.overview}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
