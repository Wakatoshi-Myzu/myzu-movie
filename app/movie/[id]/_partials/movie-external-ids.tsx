"use client";

import { useMovieExternalIds } from "@/hooks/use-movie-external-ids";
import { Icon } from "@iconify/react";

interface MovieExternalIdsProps {
  movieId: number;
}

export function MovieExternalIds({ movieId }: MovieExternalIdsProps) {
  const { data: externalIds, isLoading } = useMovieExternalIds(movieId);

  if (isLoading || !externalIds) {
    return null;
  }

  const links = [];

  if (externalIds.imdbId) {
    links.push({
      label: "IMDb",
      url: `https://www.imdb.com/title/${externalIds.imdbId}`,
      icon: "mdi:movie-open",
    });
  }

  if (externalIds.wikidataId) {
    links.push({
      label: "Wikidata",
      url: `https://www.wikidata.org/wiki/${externalIds.wikidataId}`,
      icon: "mdi:database",
    });
  }

  if (externalIds.facebookId) {
    links.push({
      label: "Facebook",
      url: `https://www.facebook.com/${externalIds.facebookId}`,
      icon: "mdi:facebook",
    });
  }

  if (externalIds.instagramId) {
    links.push({
      label: "Instagram",
      url: `https://www.instagram.com/${externalIds.instagramId}`,
      icon: "mdi:instagram",
    });
  }

  if (externalIds.twitterId) {
    links.push({
      label: "Twitter",
      url: `https://twitter.com/${externalIds.twitterId}`,
      icon: "mdi:twitter",
    });
  }

  if (links.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="mb-4 inline-block border-b-[3px] border-[var(--nb-shadow)] text-xl font-black uppercase tracking-tight">
        External Links
      </h2>
      <div className="flex flex-wrap gap-2">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="nb-border-sm nb-shadow-sm inline-flex items-center gap-1.5 rounded-lg bg-background px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_var(--nb-shadow)]"
          >
            <Icon icon={link.icon} className="size-4" />
            {link.label}
            <Icon icon="mdi:open-in-new" className="size-3" />
          </a>
        ))}
      </div>
    </section>
  );
}
