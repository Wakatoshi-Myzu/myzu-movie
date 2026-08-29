"use client";

import { useState } from "react";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ResponsiveModal } from "@/components/ui/responsive-modal";
import { Icon } from "@iconify/react";
import { getProfileUrl } from "@/lib/tmdb/image";
import type { MovieDetail, MovieCredits, CastMember } from "@/lib/tmdb/mapper";

interface MovieInfoProps {
  movie: MovieDetail;
  credits: MovieCredits;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function CastCard({ person }: { person: CastMember }) {
  return (
    <Link
      href={`/person/${person.id}`}
      className="nb-card group flex items-center gap-3 bg-card p-3 transition-all hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_var(--nb-shadow)]"
    >
      <Avatar className="nb-shadow-sm size-12 shrink-0 border-[2.5px] border-[var(--nb-shadow)]">
        <AvatarImage
          src={getProfileUrl(person.profilePath, "w185")}
          alt={person.name}
        />
        <AvatarFallback className="bg-muted text-xs font-black">
          {getInitials(person.name)}
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0">
        <p className="truncate text-sm font-black group-hover:text-primary">
          {person.name}
        </p>
        <p className="truncate text-xs text-muted-foreground">
          {person.character}
        </p>
      </div>
    </Link>
  );
}

export function MovieInfo({ movie, credits }: MovieInfoProps) {
  const [showAllCast, setShowAllCast] = useState(false);
  const topCast = credits.cast.slice(0, 6);
  const allCast = credits.cast;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="mb-4 inline-block border-b-[3px] border-[var(--nb-shadow)] text-xl font-black uppercase tracking-tight">
              Overview
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              {movie.overview}
            </p>
          </section>

          {topCast.length > 0 && (
            <section>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="inline-block border-b-[3px] border-[var(--nb-shadow)] text-xl font-black uppercase tracking-tight">
                  Cast
                </h2>
                {allCast.length > 6 && (
                  <button
                    onClick={() => setShowAllCast(true)}
                    className="nb-border-sm nb-shadow-sm inline-flex items-center gap-1.5 rounded-lg bg-background px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_var(--nb-shadow)]"
                  >
                    <Icon icon="mdi:account-group" className="size-4" />
                    Show All ({allCast.length})
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {topCast.map((person) => (
                  <CastCard key={person.id} person={person} />
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="space-y-6">
          <section>
            <h3 className="mb-3 inline-block border-b-[3px] border-[var(--nb-shadow)] text-sm font-black uppercase tracking-wider">
              Details
            </h3>
            <div className="nb-card space-y-3 bg-card p-4 text-sm">
              {movie.budget > 0 && (
                <div className="flex items-center justify-between border-b border-border pb-2">
                  <span className="text-muted-foreground">Budget</span>
                  <span className="nb-badge bg-muted px-2 py-0.5 text-xs font-black">
                    ${movie.budget.toLocaleString()}
                  </span>
                </div>
              )}
              {movie.revenue > 0 && (
                <div className="flex items-center justify-between border-b border-border pb-2">
                  <span className="text-muted-foreground">Revenue</span>
                  <span className="nb-badge bg-muted px-2 py-0.5 text-xs font-black">
                    ${movie.revenue.toLocaleString()}
                  </span>
                </div>
              )}
              {movie.spokenLanguages.length > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Languages</span>
                  <span className="text-right text-xs font-black">
                    {movie.spokenLanguages.map((l) => l.englishName).join(", ")}
                  </span>
                </div>
              )}
            </div>
          </section>

          {movie.productionCompanies.length > 0 && (
            <section>
              <h3 className="mb-3 inline-block border-b-[3px] border-[var(--nb-shadow)] text-sm font-black uppercase tracking-wider">
                Production
              </h3>
              <div className="nb-card bg-card p-4">
                <ul className="space-y-2 text-sm">
                  {movie.productionCompanies.slice(0, 3).map((company) => (
                    <li key={company.id} className="nb-badge inline-block bg-muted px-2 py-1 text-xs font-black">
                      {company.name}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}
        </div>
      </div>

      {/* All Cast Modal */}
      <ResponsiveModal
        open={showAllCast}
        onOpenChange={setShowAllCast}
        title={`Cast of ${movie.title}`}
      >
        <div className="max-h-[70vh] overflow-y-auto p-4">
          <div className="mb-4 flex items-center gap-2">
            <Icon icon="mdi:account-group" className="size-5 text-primary" />
            <h3 className="text-lg font-black uppercase tracking-tight">
              All Cast
            </h3>
            <span className="nb-badge bg-muted px-2 py-0.5 text-xs font-black">
              {allCast.length}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {allCast.map((person) => (
              <CastCard key={person.id} person={person} />
            ))}
          </div>
        </div>
      </ResponsiveModal>
    </div>
  );
}
