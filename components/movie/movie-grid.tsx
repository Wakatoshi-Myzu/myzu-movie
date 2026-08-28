import { MovieCard } from "@/components/movie/movie-card";
import type { MovieListItem } from "@/lib/tmdb/mapper";

interface MovieGridProps {
  movies: MovieListItem[];
}

export function MovieGrid({ movies }: MovieGridProps) {
  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {movies.map((movie, index) => (
        <MovieCard key={movie.id} movie={movie} index={index} />
      ))}
    </div>
  );
}
