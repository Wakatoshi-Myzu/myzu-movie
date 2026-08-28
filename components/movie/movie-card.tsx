import Link from "next/link";
import Image from "next/image";
import { getPosterUrl } from "@/lib/tmdb/image";
import { MovieRating } from "@/components/movie/movie-rating";
import type { MovieListItem } from "@/lib/tmdb/mapper";

interface MovieCardProps {
  movie: MovieListItem;
  index?: number;
}

export function MovieCard({ movie, index = 0 }: MovieCardProps) {
  const year = movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : null;

  return (
    <Link href={`/movie/${movie.id}`} className="group block nb-card-anim" style={{ "--animation-order": index } as React.CSSProperties}>
      <div className="nb-card bg-card overflow-hidden">
        <div className="relative aspect-[2/3] overflow-hidden border-b-[3px] border-black bg-muted">
          <Image
            src={getPosterUrl(movie.posterPath, "w342")}
            alt={`${movie.title} poster`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          {/* Rating badge */}
          <div className="absolute top-2 right-2 nb-badge bg-yellow-400 px-2 py-0.5 text-xs text-black">
            ★ {movie.voteAverage.toFixed(1)}
          </div>
        </div>

        <div className="p-3 space-y-1.5">
          <h3 className="line-clamp-1 text-sm font-black uppercase tracking-tight leading-tight group-hover:text-primary">
            {movie.title}
          </h3>
          <div className="flex items-center gap-2">
            {year && (
              <span className="nb-badge bg-muted px-1.5 py-0.5 text-[10px] font-black text-foreground">
                {year}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
