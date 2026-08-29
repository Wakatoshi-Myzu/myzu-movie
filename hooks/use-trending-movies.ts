"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchTrendingMovies } from "@/services/api/movies";
import { movieKeys } from "@/lib/react-query/keys";

export function useTrendingMovies(window: "day" | "week" = "day") {
  return useQuery({
    queryKey: movieKeys.trending(window),
    queryFn: () => fetchTrendingMovies(window),
    staleTime: 5 * 60 * 1000,
  });
}
