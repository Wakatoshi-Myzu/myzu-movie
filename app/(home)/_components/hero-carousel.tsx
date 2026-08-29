"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { getBackdropUrl } from "@/lib/tmdb/image";
import { HeroContent } from "@/app/(home)/_components/hero-content";
import type { MovieListItem } from "@/lib/tmdb/mapper";

interface HeroCarouselProps {
  movies: MovieListItem[];
}

export function HeroCarousel({ movies }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const cycleToNext = useCallback(() => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
      setTimeout(() => setIsFading(false), 50);
    }, 500);
  }, [movies.length]);

  useEffect(() => {
    if (movies.length <= 1) return;
    const interval = setInterval(cycleToNext, 6000);
    return () => clearInterval(interval);
  }, [cycleToNext, movies.length]);

  const movie = movies[currentIndex];

  return (
    <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
      {/* Full-width backdrop images */}
      {movies.map((m, i) => (
        <div
          key={m.id}
          className="absolute inset-0 transition-opacity duration-500"
          style={{ opacity: i === currentIndex && !isFading ? 1 : 0 }}
        >
          <Image
            src={getBackdropUrl(m.backdropPath, "original")}
            alt=""
            fill
            className="object-cover"
            priority={i === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
      ))}

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-4 pb-12 sm:px-6 lg:px-8">
        {movie && <HeroContent movie={movie} isFading={isFading} />}
      </div>

      {/* Dot indicators */}
      {movies.length > 1 && (
        <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 flex items-center gap-2">
          {movies.map((m, i) => (
            <button
              key={m.id}
              onClick={() => {
                setIsFading(true);
                setTimeout(() => {
                  setCurrentIndex(i);
                  setTimeout(() => setIsFading(false), 50);
                }, 500);
              }}
              className={`nb-border-sm size-3 rounded-full transition-all ${
                i === currentIndex
                  ? "bg-primary shadow-[2px_2px_0px_var(--nb-shadow)]"
                  : "bg-muted shadow-[1px_1px_0px_var(--nb-shadow)] hover:bg-accent"
              }`}
              aria-label={`Go to ${m.title}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
