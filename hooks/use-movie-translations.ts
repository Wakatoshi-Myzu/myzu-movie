"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMovieTranslations } from "@/services/api/movies";
import { movieKeys } from "@/lib/react-query/keys";

export function useMovieTranslations(id: number) {
  return useQuery({
    queryKey: movieKeys.translations(id),
    queryFn: () => fetchMovieTranslations(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 60,
  });
}
