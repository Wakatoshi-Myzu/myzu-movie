"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchPopularTvSeries, fetchAiringTodayTvSeries, fetchOnTheAirTvSeries, fetchTopRatedTvSeries } from "@/services/api/movies";
import { tvKeys } from "@/lib/react-query/keys";

export function usePopularTvSeries(page = 1) {
  return useQuery({
    queryKey: tvKeys.popular(page),
    queryFn: () => fetchPopularTvSeries(page),
    staleTime: 1000 * 60 * 5,
  });
}

export function useAiringTodayTvSeries(page = 1) {
  return useQuery({
    queryKey: tvKeys.airingToday(page),
    queryFn: () => fetchAiringTodayTvSeries(page),
    staleTime: 1000 * 60 * 5,
  });
}

export function useOnTheAirTvSeries(page = 1) {
  return useQuery({
    queryKey: tvKeys.onTheAir(page),
    queryFn: () => fetchOnTheAirTvSeries(page),
    staleTime: 1000 * 60 * 5,
  });
}

export function useTopRatedTvSeries(page = 1) {
  return useQuery({
    queryKey: tvKeys.topRated(page),
    queryFn: () => fetchTopRatedTvSeries(page),
    staleTime: 1000 * 60 * 5,
  });
}
