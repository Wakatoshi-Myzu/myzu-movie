"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useMovieSimilar } from "@/hooks/use-movie-similar";
import { useMovieRecommendations } from "@/hooks/use-movie-recommendations";
import { MovieGrid } from "@/components/movie/movie-grid";
import { MovieGridSkeleton } from "@/components/movie/movie-grid-skeleton";

interface MovieSimilarProps {
  movieId: number;
}

type SectionType = "recommendations" | "similar";

export function MovieSimilar({ movieId }: MovieSimilarProps) {
  const [activeSection, setActiveSection] =
    useState<SectionType>("recommendations");

  const recommendationsQuery = useMovieRecommendations(movieId);
  const similarQuery = useMovieSimilar(movieId);

  const recommendations = recommendationsQuery.data?.results || [];
  const similar = similarQuery.data?.results || [];

  const isLoading =
    (activeSection === "recommendations" && recommendationsQuery.isLoading) ||
    (activeSection === "similar" && similarQuery.isLoading);

  const currentMovies =
    activeSection === "recommendations" ? recommendations : similar;

  const hasRecommendations = recommendations.length > 0;
  const hasSimilar = similar.length > 0;
  const hasAnyContent = hasRecommendations || hasSimilar;

  if (!hasAnyContent) return null;

  return (
    <section>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="inline-block border-b-[3px] border-[var(--nb-shadow)] text-xl font-black uppercase tracking-tight">
          You Might Also Like
        </h2>

        <div className="flex gap-2">
          {hasRecommendations && (
            <button
              onClick={() => setActiveSection("recommendations")}
              className={`nb-border-sm nb-shadow-sm inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_var(--nb-shadow)] ${
                activeSection === "recommendations"
                  ? "nb-on-primary bg-primary text-primary-foreground"
                  : "bg-background"
              }`}
            >
              <Icon icon="mdi:sparkles" className="size-4" />
              Recommendations
            </button>
          )}
          {hasSimilar && (
            <button
              onClick={() => setActiveSection("similar")}
              className={`nb-border-sm nb-shadow-sm inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_var(--nb-shadow)] ${
                activeSection === "similar"
                  ? "nb-on-primary bg-primary text-primary-foreground"
                  : "bg-background"
              }`}
            >
              <Icon icon="mdi:movie-open-variant" className="size-4" />
              Similar
            </button>
          )}
        </div>
      </div>

      {isLoading ? (
        <MovieGridSkeleton count={6} />
      ) : currentMovies.length > 0 ? (
        <MovieGrid movies={currentMovies.slice(0, 12)} />
      ) : (
        <div className="nb-card mx-auto max-w-md bg-card p-8 text-center">
          <Icon
            icon="mdi:movie-open-outline"
            className="mx-auto mb-4 size-12 text-muted-foreground"
          />
          <p className="mb-2 text-lg font-black uppercase">No Movies Found</p>
          <p className="text-sm text-muted-foreground">
            No {activeSection} available for this movie.
          </p>
        </div>
      )}
    </section>
  );
}
