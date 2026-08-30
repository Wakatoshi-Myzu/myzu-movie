"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { getPosterUrl } from "@/lib/tmdb/image";
import type { TvSeriesListItem } from "@/lib/tmdb/mapper";

interface TvCardProps {
  show: TvSeriesListItem;
  index?: number;
}

export function TvCard({ show, index = 0 }: TvCardProps) {
  const [imgError, setImgError] = useState(false);
  const year = show.firstAirDate
    ? new Date(show.firstAirDate).getFullYear()
    : null;

  return (
    <Link
      href={`/tv/${show.id}`}
      className="group nb-card nb-card-anim block bg-card"
      style={{ "--animation-order": index } as React.CSSProperties}
    >
      <div className="relative aspect-[2/3] overflow-hidden border-b-[3px] border-[var(--nb-shadow)] bg-muted rounded-t-[9px]">
        {imgError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <Icon icon="mdi:television" className="size-10 text-muted-foreground/50" />
            <span className="text-[10px] font-black uppercase text-muted-foreground/50">
              No Image
            </span>
          </div>
        ) : (
          <Image
            src={getPosterUrl(show.posterPath, "w342")}
            alt={`${show.name} poster`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            onError={() => setImgError(true)}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="absolute top-2 right-2 nb-badge nb-on-yellow bg-yellow-400 px-2 py-0.5 text-xs text-black">
          ★ {show.voteAverage.toFixed(1)}
        </div>
      </div>

      <div className="p-3 space-y-1.5">
        <h3 className="line-clamp-1 text-sm font-black uppercase tracking-tight leading-tight group-hover:text-primary">
          {show.name}
        </h3>
        <div className="flex items-center gap-2">
          {year && (
            <span className="nb-badge bg-muted px-1.5 py-0.5 text-[10px] font-black text-foreground">
              {year}
            </span>
          )}
          {show.originCountry.length > 0 && (
            <span className="nb-badge bg-muted px-1.5 py-0.5 text-[10px] font-black text-foreground">
              {show.originCountry[0]}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
