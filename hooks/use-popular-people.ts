"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchPopularPeople } from "@/services/api/movies";
import { personKeys } from "@/lib/react-query/keys";

export function usePopularPeople(page = 1) {
  return useQuery({
    queryKey: personKeys.popular(page),
    queryFn: () => fetchPopularPeople(page),
    staleTime: 5 * 60 * 1000,
  });
}
