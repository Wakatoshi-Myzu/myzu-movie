import { getPopularMovies } from "@/lib/tmdb/server";
import { HeroCarousel } from "@/app/(home)/_components/hero-carousel";

export async function HeroSection() {
  const data = await getPopularMovies(1).catch(() => null);
  const movies = data?.results.slice(0, 5) ?? [];

  if (movies.length === 0) return null;

  return <HeroCarousel movies={movies} />;
}
