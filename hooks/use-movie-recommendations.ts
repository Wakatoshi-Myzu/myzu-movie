"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMovieRecommendations } from "@/services/api/movies";
import { movieKeys } from "@/lib/react-query/keys";

export function useMovieRecommendations(id: number) {
  return useQuery({
    queryKey: [...movieKeys.all, "recommendations", id] as const,
    queryFn: () => fetchMovieRecommendations(id),
    staleTime: 10 * 60 * 1000,
    enabled: !!id,
  });
}
