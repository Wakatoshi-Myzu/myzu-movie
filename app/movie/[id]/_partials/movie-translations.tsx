"use client";

import { useMovieTranslations } from "@/hooks/use-movie-translations";
import { Icon } from "@iconify/react";
import { useState } from "react";

interface MovieTranslationsProps {
  movieId: number;
}

export function MovieTranslations({ movieId }: MovieTranslationsProps) {
  const { data: translations, isLoading } = useMovieTranslations(movieId);
  const [showAll, setShowAll] = useState(false);

  if (isLoading || !translations?.translations.length) {
    return null;
  }

  const uniqueLanguages = Array.from(
    new Map(
      translations.translations.map((t) => [t.iso6391, t])
    ).values()
  );

  const displayedLanguages = showAll ? uniqueLanguages : uniqueLanguages.slice(0, 8);

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="inline-block border-b-[3px] border-[var(--nb-shadow)] text-xl font-black uppercase tracking-tight">
          Available Languages
        </h2>
        {uniqueLanguages.length > 8 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="nb-border-sm nb-shadow-sm inline-flex items-center gap-1.5 rounded-lg bg-background px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_var(--nb-shadow)]"
          >
            <Icon icon={showAll ? "mdi:chevron-up" : "mdi:chevron-down"} className="size-4" />
            {showAll ? "Show Less" : `Show All (${uniqueLanguages.length})`}
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {displayedLanguages.map((lang) => (
          <span
            key={lang.iso6391}
            className="nb-badge bg-muted px-2.5 py-1 text-xs font-black"
          >
            {lang.englishName}
          </span>
        ))}
      </div>
    </section>
  );
}
