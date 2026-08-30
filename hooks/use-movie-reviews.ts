"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMovieReviews } from "@/services/api/movies";
import { movieKeys } from "@/lib/react-query/keys";

export function useMovieReviews(id: number, page = 1) {
  return useQuery({
    queryKey: movieKeys.reviews(id, page),
    queryFn: () => fetchMovieReviews(id, page),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}
