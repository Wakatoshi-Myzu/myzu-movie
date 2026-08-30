"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getBackdropUrl } from "@/lib/tmdb/image";

interface MovieBackdropProps {
  backdropPath: string | null;
}

export function MovieBackdrop({ backdropPath }: MovieBackdropProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger fade-in after mount
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0">
      <Image
        src={getBackdropUrl(backdropPath, "original")}
        alt=""
        fill
        className={`object-cover transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        priority
        onLoad={() => setIsLoaded(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
    </div>
  );
}