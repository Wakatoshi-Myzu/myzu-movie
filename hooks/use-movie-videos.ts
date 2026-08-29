"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMovieVideos } from "@/services/api/movies";
import { movieKeys } from "@/lib/react-query/keys";

export function useMovieVideos(id: number) {
  return useQuery({
    queryKey: [...movieKeys.detail(id), "videos"],
    queryFn: () => fetchMovieVideos(id),
    staleTime: 10 * 60 * 1000,
    enabled: !!id,
  });
}
