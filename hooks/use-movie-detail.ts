"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMovieDetails } from "@/services/api/movies";
import { movieKeys } from "@/lib/react-query/keys";

export function useMovieDetail(id: number) {
  return useQuery({
    queryKey: movieKeys.detail(id),
    queryFn: () => fetchMovieDetails(id),
    staleTime: 10 * 60 * 1000,
    enabled: !!id,
  });
}
