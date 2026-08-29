"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { usePopularPeople } from "@/hooks/use-popular-people";
import { getProfileUrl } from "@/lib/tmdb/image";
import { Skeleton } from "@/components/ui/skeleton";

export function PeopleList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const { data, isLoading, error } = usePopularPeople(page);

  function setPage(newPage: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`/people?${params.toString()}`);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 space-y-3">
        <div className="flex items-center gap-3">
          <div className="nb-on-primary nb-shadow-sm flex size-8 items-center justify-center rounded-lg border-[2.5px] border-[var(--nb-shadow)] bg-primary">
            <Icon icon="mdi:account-group" className="size-4 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tight sm:text-3xl">
            Popular People
          </h1>
        </div>
        <p className="text-muted-foreground">
          Trending actors and filmmakers right now
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="nb-card overflow-hidden bg-card">
              <div className="aspect-[2/3] w-full animate-pulse border-b-[3px] border-[var(--nb-shadow)] bg-muted" />
              <div className="p-3 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="nb-card mx-auto max-w-md bg-card p-8 text-center">
          <Icon icon="mdi:alert-circle-outline" className="mx-auto mb-4 size-12 text-destructive" />
          <p className="mb-2 text-lg font-black uppercase">Failed to Load</p>
          <p className="mb-4 text-sm text-muted-foreground">
            Something went wrong. Please try again later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="nb-btn nb-on-primary bg-primary px-5 py-2.5 text-sm text-primary-foreground"
          >
            TRY AGAIN
          </button>
        </div>
      ) : data && data.results.length > 0 ? (
        <>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {data.results.map((person) => (
              <Link
                key={person.id}
                href={`/person/${person.id}`}
                className="nb-card group overflow-hidden bg-card transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_var(--nb-shadow)]"
              >
                <div className="relative aspect-[2/3] w-full border-b-[3px] border-[var(--nb-shadow)]">
                  <Image
                    src={getProfileUrl(person.profilePath, "w342")}
                    alt={person.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <div className="p-3">
                  <p className="truncate text-sm font-black">{person.name}</p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {person.knownForDepartment}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {data.totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-3">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page <= 1}
                className="nb-border-sm nb-shadow-sm inline-flex items-center gap-1 rounded-lg bg-background px-4 py-2 text-sm font-black uppercase tracking-wider transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_var(--nb-shadow)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[3px_3px_0px_var(--nb-shadow)]"
              >
                <Icon icon="mdi:chevron-left" className="size-4" />
                PREV
              </button>

              <span className="nb-badge bg-muted px-4 py-2 text-sm font-black">
                {page} / {data.totalPages}
              </span>

              <button
                onClick={() => setPage(page + 1)}
                disabled={page >= data.totalPages}
                className="nb-border-sm nb-shadow-sm inline-flex items-center gap-1 rounded-lg bg-background px-4 py-2 text-sm font-black uppercase tracking-wider transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_var(--nb-shadow)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[3px_3px_0px_var(--nb-shadow)]"
              >
                NEXT
                <Icon icon="mdi:chevron-right" className="size-4" />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="nb-card mx-auto max-w-md bg-card p-8 text-center">
          <Icon icon="mdi:account-outline" className="mx-auto mb-4 size-12 text-muted-foreground" />
          <p className="mb-2 text-lg font-black uppercase">No People Found</p>
          <p className="text-sm text-muted-foreground">
            No popular people available right now.
          </p>
        </div>
      )}
    </div>
  );
}
