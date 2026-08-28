"use client";

import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "@/services/api/movies";
import { searchKeys } from "@/lib/react-query/keys";

export function useSearchMovies(query: string, page = 1) {
  return useQuery({
    queryKey: searchKeys.movies(query, page),
    queryFn: () => searchMovies(query, page),
    staleTime: 2 * 60 * 1000,
    enabled: query.trim().length > 0,
  });
}
