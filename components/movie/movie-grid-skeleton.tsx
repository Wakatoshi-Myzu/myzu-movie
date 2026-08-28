import { MovieCardSkeleton } from "@/components/movie/movie-card-skeleton";

interface MovieGridSkeletonProps {
  count?: number;
}

export function MovieGridSkeleton({ count = 12 }: MovieGridSkeletonProps) {
  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {Array.from({ length: count }).map((_, i) => (
        <MovieCardSkeleton key={i} />
      ))}
    </div>
  );
}
