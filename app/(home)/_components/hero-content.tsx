"use client";

import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { getPosterUrl } from "@/lib/tmdb/image";
import type { MovieListItem } from "@/lib/tmdb/mapper";

interface HeroContentProps {
  movie: MovieListItem;
  isFading: boolean;
}

export function HeroContent({ movie, isFading }: HeroContentProps) {
  if (!movie) return null;

  const year = movie.releaseDate
    ? new Date(movie.releaseDate).getFullYear()
    : null;

  return (
    <div className="flex items-end gap-6">
      {/* Poster */}
      <div
        className="hidden w-48 shrink-0 transition-opacity duration-500 sm:block lg:w-56"
        style={{ opacity: isFading ? 0 : 1 }}
      >
        <div className="nb-card overflow-hidden">
          <Image
            src={getPosterUrl(movie.posterPath, "w342")}
            alt={`${movie.title} poster`}
            width={224}
            height={336}
            className="w-full"
          />
        </div>
      </div>

      {/* Text content */}
      <div
        className="max-w-2xl space-y-4 transition-opacity duration-500"
        style={{ opacity: isFading ? 0 : 1 }}
      >
        <div className="flex items-center gap-3 text-sm">
          <span className="nb-badge nb-on-primary bg-primary px-2 py-0.5 text-xs text-primary-foreground">
            ★ FEATURED
          </span>
          {year && (
            <span className="nb-badge bg-muted px-2 py-0.5 text-xs font-black text-foreground">
              {year}
            </span>
          )}
          <span className="nb-badge nb-on-yellow bg-yellow-400 px-2 py-0.5 text-xs font-black text-black">
            ★ {movie.voteAverage.toFixed(1)}
          </span>
        </div>

        <div className="min-h-[2.5rem] sm:min-h-[3rem] lg:min-h-[3.5rem]">
          <h1 className="text-3xl font-black uppercase tracking-tight sm:text-4xl lg:text-5xl">
            {movie.title}
          </h1>
        </div>

        <div className="min-h-[4.5rem]">
          <p className="line-clamp-3 text-base text-muted-foreground sm:line-clamp-4">
            {movie.overview}
          </p>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Link
            href={`/movie/${movie.id}`}
            className="nb-btn nb-on-primary inline-flex items-center gap-2 bg-primary px-5 py-2.5 text-sm text-primary-foreground"
          >
            <Icon icon="mdi:information-outline" className="size-4" />
            VIEW DETAILS
          </Link>
        </div>
      </div>
    </div>
  );
}
