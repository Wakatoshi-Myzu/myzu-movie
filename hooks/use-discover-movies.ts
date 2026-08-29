"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchDiscoverMovies } from "@/services/api/movies";
import { discoverKeys } from "@/lib/react-query/keys";

interface UseDiscoverMoviesParams {
  page?: number;
  sortBy?: string;
  genreIds?: string;
  primaryReleaseYear?: number;
  voteAverageGte?: number;
  voteAverageLte?: number;
  voteCountGte?: number;
  withRuntimeGte?: number;
  withRuntimeLte?: number;
  year?: number;
}

export function useDiscoverMovies(params: UseDiscoverMoviesParams = {}) {
  const queryParams: Record<string, string | number | undefined> = {
    page: params.page || 1,
    sort_by: params.sortBy || "popularity.desc",
    with_genres: params.genreIds,
    primary_release_year: params.primaryReleaseYear,
    "vote_average.gte": params.voteAverageGte,
    "vote_average.lte": params.voteAverageLte,
    "vote_count.gte": params.voteCountGte,
    "with_runtime.gte": params.withRuntimeGte,
    "with_runtime.lte": params.withRuntimeLte,
    year: params.year,
  };

  return useQuery({
    queryKey: discoverKeys.movies(queryParams),
    queryFn: () => fetchDiscoverMovies(queryParams),
    staleTime: 5 * 60 * 1000,
  });
}
