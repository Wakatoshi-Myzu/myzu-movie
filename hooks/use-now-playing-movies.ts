"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNowPlayingMovies } from "@/services/api/movies";
import { movieKeys } from "@/lib/react-query/keys";

export function useNowPlayingMovies(page = 1) {
  return useQuery({
    queryKey: movieKeys.nowPlaying(page),
    queryFn: () => fetchNowPlayingMovies(page),
    staleTime: 5 * 60 * 1000,
  });
}
