"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchSimilarMovies } from "@/services/api/movies";
import { movieKeys } from "@/lib/react-query/keys";

export function useMovieSimilar(id: number) {
  return useQuery({
    queryKey: movieKeys.similar(id),
    queryFn: () => fetchSimilarMovies(id),
    staleTime: 10 * 60 * 1000,
    enabled: !!id,
  });
}
