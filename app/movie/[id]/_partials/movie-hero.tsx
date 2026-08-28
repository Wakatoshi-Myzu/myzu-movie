import Image from "next/image";
import { getBackdropUrl, getPosterUrl } from "@/lib/tmdb/image";
import type { MovieDetail } from "@/lib/tmdb/mapper";

interface MovieHeroProps {
  movie: MovieDetail;
}

export function MovieHero({ movie }: MovieHeroProps) {
  return (
    <section className="relative min-h-[50vh] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={getBackdropUrl(movie.backdropPath, "original")}
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[50vh] max-w-7xl flex-col justify-end px-4 pt-20 pb-12 sm:px-6 sm:pt-24 lg:px-8">
        <div className="flex items-end gap-6">
          <div className="hidden w-48 shrink-0 sm:block lg:w-56">
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

          <div className="max-w-2xl space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="nb-badge nb-on-primary bg-primary px-2.5 py-1 text-xs text-primary-foreground">
                {movie.status}
              </span>
              {movie.releaseDate && (
                <span className="nb-badge bg-muted px-2.5 py-1 text-xs font-black text-foreground">
                  {new Date(movie.releaseDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              )}
              {movie.runtime && (
                <span className="nb-badge bg-muted px-2.5 py-1 text-xs font-black text-foreground">
                  {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                </span>
              )}
              <span className="nb-badge bg-yellow-400 px-2.5 py-1 text-xs font-black text-black">
                ★ {movie.voteAverage.toFixed(1)}
              </span>
            </div>

            <h1 className="text-3xl font-black uppercase tracking-tight sm:text-4xl lg:text-5xl">
              {movie.title}
            </h1>

            {movie.tagline && (
              <p className="text-lg italic text-muted-foreground">
                &ldquo;{movie.tagline}&rdquo;
              </p>
            )}

            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="nb-badge bg-muted px-2.5 py-1 text-xs font-black"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
