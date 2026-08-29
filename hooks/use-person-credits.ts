"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchPersonCombinedCredits } from "@/services/api/movies";
import { personKeys } from "@/lib/react-query/keys";

export function usePersonCredits(id: number) {
  return useQuery({
    queryKey: personKeys.credits(id),
    queryFn: () => fetchPersonCombinedCredits(id),
    staleTime: 10 * 60 * 1000,
    enabled: !!id,
  });
}
