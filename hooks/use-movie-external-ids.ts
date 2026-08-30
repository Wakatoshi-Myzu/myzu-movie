"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMovieExternalIds } from "@/services/api/movies";
import { movieKeys } from "@/lib/react-query/keys";

export function useMovieExternalIds(id: number) {
  return useQuery({
    queryKey: movieKeys.externalIds(id),
    queryFn: () => fetchMovieExternalIds(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 60,
  });
}
