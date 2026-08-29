"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchTopRatedMovies } from "@/services/api/movies";
import { movieKeys } from "@/lib/react-query/keys";

export function useTopRatedMovies(page = 1) {
  return useQuery({
    queryKey: movieKeys.topRated(page),
    queryFn: () => fetchTopRatedMovies(page),
    staleTime: 5 * 60 * 1000,
  });
}
