import Image from "next/image";
import { getPopularMovies } from "@/lib/tmdb/server";
import { getBackdropUrl, getPosterUrl } from "@/lib/tmdb/image";
import { HeroContent } from "@/app/(home)/_components/hero-content";

export async function HeroSection() {
  const data = await getPopularMovies(1).catch(() => null);
  const featuredMovie = data?.results[0];

  if (!featuredMovie) return null;

  return (
    <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={getBackdropUrl(featuredMovie.backdropPath, "original")}
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto flex h-full max-w-7xl items-end px-4 pb-12 sm:px-6 lg:px-8">
        <div className="flex items-end gap-6">
          <div className="hidden w-48 shrink-0 sm:block lg:w-56">
            <div className="nb-card overflow-hidden">
              <Image
                src={getPosterUrl(featuredMovie.posterPath, "w342")}
                alt={`${featuredMovie.title} poster`}
                width={224}
                height={336}
                className="w-full"
              />
            </div>
          </div>
          <HeroContent movie={featuredMovie} />
        </div>
      </div>
    </section>
  );
}
