"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchPersonDetails } from "@/services/api/movies";
import { personKeys } from "@/lib/react-query/keys";

export function usePersonDetail(id: number) {
  return useQuery({
    queryKey: personKeys.detail(id),
    queryFn: () => fetchPersonDetails(id),
    staleTime: 10 * 60 * 1000,
    enabled: !!id,
  });
}
