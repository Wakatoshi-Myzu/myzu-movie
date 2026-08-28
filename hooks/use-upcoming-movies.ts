"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchUpcomingMovies } from "@/services/api/movies";
import { movieKeys } from "@/lib/react-query/keys";

export function useUpcomingMovies(page = 1) {
  return useQuery({
    queryKey: movieKeys.upcoming(page),
    queryFn: () => fetchUpcomingMovies(page),
    staleTime: 5 * 60 * 1000,
  });
}
