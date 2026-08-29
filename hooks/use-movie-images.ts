"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMovieImages } from "@/services/api/movies";
import { movieKeys } from "@/lib/react-query/keys";

export function useMovieImages(id: number) {
  return useQuery({
    queryKey: [...movieKeys.detail(id), "images"],
    queryFn: () => fetchMovieImages(id),
    staleTime: 10 * 60 * 1000,
    enabled: !!id,
  });
}
