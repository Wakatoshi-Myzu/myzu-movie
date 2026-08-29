"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getPosterUrl } from "@/lib/tmdb/image";
import type { PersonCombinedCredits } from "@/lib/tmdb/mapper";

interface PersonFilmographyProps {
  credits: PersonCombinedCredits;
}

type CreditTab = "cast" | "crew";

function getInitials(title: string): string {
  return title
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function PersonFilmography({ credits }: PersonFilmographyProps) {
  const [activeTab, setActiveTab] = useState<CreditTab>("cast");

  const castCredits = credits.cast
    .filter((c) => c.mediaType === "movie")
    .sort((a, b) => {
      const dateA = a.releaseDate ? new Date(a.releaseDate).getTime() : 0;
      const dateB = b.releaseDate ? new Date(b.releaseDate).getTime() : 0;
      return dateB - dateA;
    });

  const crewCredits = credits.crew
    .filter((c) => c.mediaType === "movie")
    .sort((a, b) => {
      const dateA = a.releaseDate ? new Date(a.releaseDate).getTime() : 0;
      const dateB = b.releaseDate ? new Date(b.releaseDate).getTime() : 0;
      return dateB - dateA;
    });

  const hasCast = castCredits.length > 0;
  const hasCrew = crewCredits.length > 0;

  if (!hasCast && !hasCrew) return null;

  return (
    <section>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="inline-block border-b-[3px] border-[var(--nb-shadow)] text-xl font-black uppercase tracking-tight">
          Filmography
        </h2>

        <div className="flex gap-2">
          {hasCast && (
            <button
              onClick={() => setActiveTab("cast")}
              className={`nb-border-sm nb-shadow-sm inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_var(--nb-shadow)] ${
                activeTab === "cast"
                  ? "nb-on-primary bg-primary text-primary-foreground"
                  : "bg-background"
              }`}
            >
              <Icon icon="mdi:account-voice" className="size-4" />
              Acting ({castCredits.length})
            </button>
          )}
          {hasCrew && (
            <button
              onClick={() => setActiveTab("crew")}
              className={`nb-border-sm nb-shadow-sm inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_var(--nb-shadow)] ${
                activeTab === "crew"
                  ? "nb-on-primary bg-primary text-primary-foreground"
                  : "bg-background"
              }`}
            >
              <Icon icon="mdi:briefcase-outline" className="size-4" />
              Crew ({crewCredits.length})
            </button>
          )}
        </div>
      </div>

      {activeTab === "cast" && hasCast && (
        <div className="space-y-3">
          {castCredits.map((credit) => (
            <Link
              key={`${credit.id}-${credit.character}`}
              href={`/movie/${credit.id}`}
              className="nb-card group flex items-center gap-4 bg-card p-3 transition-all hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_var(--nb-shadow)]"
            >
              <Avatar className="nb-shadow-sm size-16 shrink-0 rounded-lg border-[2.5px] border-[var(--nb-shadow)]">
                <AvatarImage
                  src={getPosterUrl(credit.posterPath, "w92")}
                  alt={credit.title}
                  className="object-cover"
                />
                <AvatarFallback className="rounded-lg bg-muted text-xs font-black">
                  {getInitials(credit.title)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-black group-hover:text-primary">
                  {credit.title}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  as <span className="font-medium text-foreground">{credit.character}</span>
                </p>
                <div className="mt-1 flex items-center gap-2">
                  {credit.releaseDate && (
                    <span className="text-xs text-muted-foreground">
                      {new Date(credit.releaseDate).getFullYear()}
                    </span>
                  )}
                  {credit.voteAverage > 0 && (
                    <span className="inline-flex items-center gap-0.5 text-xs text-yellow-500">
                      <Icon icon="mdi:star" className="size-3" />
                      {credit.voteAverage.toFixed(1)}
                    </span>
                  )}
                </div>
              </div>
              <Icon
                icon="mdi:chevron-right"
                className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
              />
            </Link>
          ))}
        </div>
      )}

      {activeTab === "crew" && hasCrew && (
        <div className="space-y-3">
          {crewCredits.map((credit) => (
            <Link
              key={`${credit.id}-${credit.job}`}
              href={`/movie/${credit.id}`}
              className="nb-card group flex items-center gap-4 bg-card p-3 transition-all hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_var(--nb-shadow)]"
            >
              <Avatar className="nb-shadow-sm size-16 shrink-0 rounded-lg border-[2.5px] border-[var(--nb-shadow)]">
                <AvatarImage
                  src={getPosterUrl(credit.posterPath, "w92")}
                  alt={credit.title}
                  className="object-cover"
                />
                <AvatarFallback className="rounded-lg bg-muted text-xs font-black">
                  {getInitials(credit.title)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-black group-hover:text-primary">
                  {credit.title}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">{credit.job}</span>
                  {" • "}
                  {credit.department}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  {credit.releaseDate && (
                    <span className="text-xs text-muted-foreground">
                      {new Date(credit.releaseDate).getFullYear()}
                    </span>
                  )}
                  {credit.voteAverage > 0 && (
                    <span className="inline-flex items-center gap-0.5 text-xs text-yellow-500">
                      <Icon icon="mdi:star" className="size-3" />
                      {credit.voteAverage.toFixed(1)}
                    </span>
                  )}
                </div>
              </div>
              <Icon
                icon="mdi:chevron-right"
                className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
              />
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
