"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMovieWatchProviders } from "@/services/api/movies";
import { movieKeys } from "@/lib/react-query/keys";

export function useMovieWatchProviders(id: number) {
  return useQuery({
    queryKey: movieKeys.watchProviders(id),
    queryFn: () => fetchMovieWatchProviders(id),
    staleTime: 10 * 60 * 1000,
    enabled: !!id,
  });
}
