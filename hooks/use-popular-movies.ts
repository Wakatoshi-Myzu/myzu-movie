"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchPopularMovies } from "@/services/api/movies";
import { movieKeys } from "@/lib/react-query/keys";

export function usePopularMovies(page = 1) {
  return useQuery({
    queryKey: movieKeys.popular(page),
    queryFn: () => fetchPopularMovies(page),
    staleTime: 5 * 60 * 1000,
  });
}
