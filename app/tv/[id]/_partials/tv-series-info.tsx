"use client";

import type { TvSeriesDetail } from "@/lib/tmdb/mapper";
import { Icon } from "@iconify/react";

interface TvSeriesInfoProps {
  tvShow: TvSeriesDetail;
}

export function TvSeriesInfo({ tvShow }: TvSeriesInfoProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="mb-4 inline-block border-b-[3px] border-[var(--nb-shadow)] text-xl font-black uppercase tracking-tight">
              Overview
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              {tvShow.overview}
            </p>
          </section>

          {tvShow.createdBy.length > 0 && (
            <section>
              <h2 className="mb-4 inline-block border-b-[3px] border-[var(--nb-shadow)] text-xl font-black uppercase tracking-tight">
                Created By
              </h2>
              <div className="flex flex-wrap gap-2">
                {tvShow.createdBy.map((creator) => (
                  <span
                    key={creator.id}
                    className="nb-badge bg-muted px-2.5 py-1 text-xs font-black"
                  >
                    {creator.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {tvShow.networks.length > 0 && (
            <section>
              <h2 className="mb-4 inline-block border-b-[3px] border-[var(--nb-shadow)] text-xl font-black uppercase tracking-tight">
                Networks
              </h2>
              <div className="flex flex-wrap gap-2">
                {tvShow.networks.map((network) => (
                  <span
                    key={network.id}
                    className="nb-badge bg-muted px-2.5 py-1 text-xs font-black"
                  >
                    {network.name}
                  </span>
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
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Status</span>
                <span className="nb-badge bg-muted px-2 py-0.5 text-xs font-black">
                  {tvShow.status}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">First Air Date</span>
                <span className="text-right text-xs font-black">
                  {tvShow.firstAirDate
                    ? new Date(tvShow.firstAirDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "TBA"}
                </span>
              </div>
              {tvShow.lastAirDate && (
                <div className="flex items-center justify-between border-b border-border pb-2">
                  <span className="text-muted-foreground">Last Air Date</span>
                  <span className="text-right text-xs font-black">
                    {new Date(tvShow.lastAirDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Seasons</span>
                <span className="nb-badge bg-muted px-2 py-0.5 text-xs font-black">
                  {tvShow.numberOfSeasons}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Episodes</span>
                <span className="nb-badge bg-muted px-2 py-0.5 text-xs font-black">
                  {tvShow.numberOfEpisodes}
                </span>
              </div>
              {tvShow.spokenLanguages.length > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Languages</span>
                  <span className="text-right text-xs font-black">
                    {tvShow.spokenLanguages.map((l) => l.englishName).join(", ")}
                  </span>
                </div>
              )}
            </div>
          </section>

          {tvShow.productionCompanies.length > 0 && (
            <section>
              <h3 className="mb-3 inline-block border-b-[3px] border-[var(--nb-shadow)] text-sm font-black uppercase tracking-wider">
                Production
              </h3>
              <div className="nb-card bg-card p-4">
                <ul className="space-y-2 text-sm">
                  {tvShow.productionCompanies.slice(0, 3).map((company) => (
                    <li key={company.id} className="nb-badge inline-block bg-muted px-2 py-1 text-xs font-black">
                      {company.name}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {tvShow.homepage && (
            <section>
              <a
                href={tvShow.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="nb-border-sm nb-shadow-sm flex items-center justify-center gap-2 rounded-lg bg-background px-4 py-2.5 font-black uppercase tracking-wider transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_var(--nb-shadow)]"
              >
                <Icon icon="mdi:open-in-new" className="size-4" />
                Official Website
              </a>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
