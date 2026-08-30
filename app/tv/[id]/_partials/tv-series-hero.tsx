import Image from "next/image";
import { getBackdropUrl, getPosterUrl } from "@/lib/tmdb/image";
import type { TvSeriesDetail } from "@/lib/tmdb/mapper";

interface TvSeriesHeroProps {
  tvShow: TvSeriesDetail;
}

export function TvSeriesHero({ tvShow }: TvSeriesHeroProps) {
  return (
    <section className="relative min-h-[50vh] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={getBackdropUrl(tvShow.backdropPath, "original")}
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pt-20 pb-12 sm:px-6 sm:pt-24 lg:px-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-end">
          <div className="w-36 shrink-0 sm:w-48 lg:w-56">
            <div className="nb-card overflow-hidden">
              <Image
                src={getPosterUrl(tvShow.posterPath, "w342")}
                alt={`${tvShow.name} poster`}
                width={224}
                height={336}
                className="w-full"
              />
            </div>
          </div>

          <div className="max-w-2xl space-y-4 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
              <span className="nb-badge nb-on-primary bg-primary px-2.5 py-1 text-xs text-primary-foreground">
                {tvShow.status}
              </span>
              {tvShow.firstAirDate && (
                <span className="nb-badge bg-muted px-2.5 py-1 text-xs font-black text-foreground">
                  {new Date(tvShow.firstAirDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              )}
              <span className="nb-badge bg-muted px-2.5 py-1 text-xs font-black text-foreground">
                {tvShow.numberOfSeasons} Season{tvShow.numberOfSeasons !== 1 ? "s" : ""}
              </span>
              <span className="nb-badge bg-muted px-2.5 py-1 text-xs font-black text-foreground">
                {tvShow.numberOfEpisodes} Episodes
              </span>
              <span className="nb-badge nb-on-yellow bg-yellow-400 px-2.5 py-1 text-xs font-black text-black">
                ★ {tvShow.voteAverage.toFixed(1)}
              </span>
            </div>

            <h1 className="text-3xl font-black uppercase tracking-tight sm:text-4xl lg:text-5xl">
              {tvShow.name}
            </h1>

            {tvShow.tagline && (
              <p className="text-lg italic text-muted-foreground">
                &ldquo;{tvShow.tagline}&rdquo;
              </p>
            )}

            <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
              {tvShow.genres.map((genre) => (
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
