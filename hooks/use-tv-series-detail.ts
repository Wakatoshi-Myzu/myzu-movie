"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchTvSeriesDetails } from "@/services/api/movies";
import { tvKeys } from "@/lib/react-query/keys";

export function useTvSeriesDetail(id: number) {
  return useQuery({
    queryKey: tvKeys.detail(id),
    queryFn: () => fetchTvSeriesDetails(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}
