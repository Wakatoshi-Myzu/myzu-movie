import { notFound } from "next/navigation";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { MovieHero } from "@/app/movie/[id]/_partials/movie-hero";
import { MovieInfo } from "@/app/movie/[id]/_partials/movie-info";
import { MovieMedia } from "@/app/movie/[id]/_partials/movie-media";
import { MovieSimilar } from "@/app/movie/[id]/_partials/movie-similar";
import { MovieWatchProviders } from "@/app/movie/[id]/_partials/movie-watch-providers";
import { getMovieDetails, getMovieCredits } from "@/lib/tmdb/server";

interface MoviePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: MoviePageProps) {
  const { id } = await params;
  const movieId = Number(id);

  if (isNaN(movieId)) {
    return { title: "Movie Not Found" };
  }

  const movie = await getMovieDetails(movieId).catch(() => null);

  if (!movie) {
    return { title: "Movie Not Found" };
  }

  return {
    title: `${movie.title} (${new Date(movie.releaseDate).getFullYear()}) | Movie Archive`,
    description: movie.overview,
  };
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;
  const movieId = Number(id);

  if (isNaN(movieId)) {
    notFound();
  }

  const [movie, credits] = await Promise.all([
    getMovieDetails(movieId).catch(() => null),
    getMovieCredits(movieId).catch(() => null),
  ]);

  if (!movie || !credits) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        <MovieHero movie={movie} />
        <MovieInfo movie={movie} credits={credits} />
        <div className="mx-auto max-w-7xl space-y-12 px-4 pb-12 sm:px-6 lg:px-8">
          <MovieWatchProviders movieId={movie.id} />
          <MovieMedia movieId={movie.id} />
          <MovieSimilar movieId={movie.id} />
        </div>
      </main>
      <Footer />
    </>
  );
}
