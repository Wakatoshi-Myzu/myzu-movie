import Link from "next/link";
import { Icon } from "@iconify/react";
import type { MovieListItem } from "@/lib/tmdb/mapper";

interface HeroContentProps {
  movie: MovieListItem;
}

export function HeroContent({ movie }: HeroContentProps) {
  const year = movie.releaseDate
    ? new Date(movie.releaseDate).getFullYear()
    : null;

  return (
    <div className="max-w-2xl space-y-4">
      <div className="flex items-center gap-3 text-sm">
        <span className="nb-badge nb-on-primary bg-primary px-2 py-0.5 text-xs text-primary-foreground">
          ★ FEATURED
        </span>
        {year && (
          <span className="nb-badge bg-muted px-2 py-0.5 text-xs font-black text-foreground">
            {year}
          </span>
        )}
        <span className="nb-badge bg-yellow-400 px-2 py-0.5 text-xs font-black text-black">
          ★ {movie.voteAverage.toFixed(1)}
        </span>
      </div>

      <h1 className="text-3xl font-black uppercase tracking-tight sm:text-4xl lg:text-5xl">
        {movie.title}
      </h1>

      <p className="line-clamp-3 text-base text-muted-foreground sm:line-clamp-4">
        {movie.overview}
      </p>

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
  );
}
