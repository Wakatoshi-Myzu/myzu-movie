"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import { useMovieWatchProviders } from "@/hooks/use-movie-watch-providers";
import { Skeleton } from "@/components/ui/skeleton";

interface MovieWatchProvidersProps {
  movieId: number;
}

const PROVIDER_LOGO_URL = "https://image.tmdb.org/t/p";

const TYPE_LABELS: Record<string, { label: string; icon: string }> = {
  flatrate: { label: "Stream", icon: "mdi:play-circle" },
  rent: { label: "Rent", icon: "mdi:cart-outline" },
  buy: { label: "Buy", icon: "mdi:shopping" },
  free: { label: "Free", icon: "mdi:gift" },
};

export function MovieWatchProviders({ movieId }: MovieWatchProvidersProps) {
  const { data, isLoading } = useMovieWatchProviders(movieId);

  if (isLoading) {
    return (
      <section>
        <h2 className="mb-4 inline-block border-b-[3px] border-[var(--nb-shadow)] text-xl font-black uppercase tracking-tight">
          Where to Watch
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="nb-card bg-card p-4">
              <Skeleton className="mb-3 h-5 w-20" />
              <div className="flex gap-2">
                {Array.from({ length: 3 }).map((_, j) => (
                  <Skeleton key={j} className="size-10 rounded-lg" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!data) return null;

  // Find US providers first, then fallback to first available region
  const region =
    data.results["US"] ||
    data.results["ID"] ||
    Object.values(data.results)[0];

  if (!region) return null;

  const hasProviders =
    (region.flatrate && region.flatrate.length > 0) ||
    (region.rent && region.rent.length > 0) ||
    (region.buy && region.buy.length > 0) ||
    (region.free && region.free.length > 0);

  if (!hasProviders) return null;

  return (
    <section>
      <h2 className="mb-4 inline-block border-b-[3px] border-[var(--nb-shadow)] text-xl font-black uppercase tracking-tight">
        Where to Watch
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(TYPE_LABELS).map(([type, config]) => {
          const providers = region[type as keyof typeof region];
          if (!providers || providers.length === 0) return null;

          return (
            <div key={type} className="nb-card bg-card p-4">
              <div className="mb-3 flex items-center gap-2">
                <Icon
                  icon={config.icon}
                  className="size-4 text-primary"
                />
                <h3 className="text-sm font-black uppercase tracking-wider">
                  {config.label}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {providers.map((provider) => (
                  <div
                    key={provider.providerId}
                    className="group relative"
                    title={provider.providerName}
                  >
                    <div className="nb-border-sm nb-shadow-sm size-12 overflow-hidden rounded-lg border-[2.5px] border-[var(--nb-shadow)] bg-muted transition-all group-hover:-translate-y-1 group-hover:shadow-[4px_4px_0px_var(--nb-shadow)]">
                      <Image
                        src={`${PROVIDER_LOGO_URL}/w92${provider.logoPath}`}
                        alt={provider.providerName}
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="pointer-events-none absolute -bottom-6 left-1/2 z-10 hidden -translate-x-1/2 whitespace-nowrap rounded-md border-[2px] border-[var(--nb-shadow)] bg-background px-2 py-1 text-[10px] font-black shadow-[2px_2px_0px_var(--nb-shadow)] group-hover:block">
                      {provider.providerName}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
