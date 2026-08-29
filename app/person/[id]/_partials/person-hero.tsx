import Image from "next/image";
import { Icon } from "@iconify/react";
import { getProfileUrl } from "@/lib/tmdb/image";
import type { PersonDetail } from "@/lib/tmdb/mapper";

interface PersonHeroProps {
  person: PersonDetail;
}

export function PersonHero({ person }: PersonHeroProps) {
  const age = person.birthday
    ? person.deathday
      ? new Date(person.deathday).getFullYear() -
        new Date(person.birthday).getFullYear()
      : new Date().getFullYear() - new Date(person.birthday).getFullYear()
    : null;

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-4 pt-20 pb-12 sm:px-6 sm:pt-24 lg:px-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          {/* Profile Image */}
          <div className="w-40 shrink-0 sm:w-48 lg:w-56">
            <div className="nb-card overflow-hidden">
              <Image
                src={getProfileUrl(person.profilePath, "h632")}
                alt={person.name}
                width={400}
                height={600}
                className="w-full"
                priority
              />
            </div>
          </div>

          {/* Info */}
          <div className="max-w-2xl space-y-4 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
              <span className="nb-badge nb-on-primary bg-primary px-2.5 py-1 text-xs text-primary-foreground">
                {person.knownForDepartment}
              </span>
              {person.birthday && (
                <span className="nb-badge bg-muted px-2.5 py-1 text-xs font-black">
                  Born: {new Date(person.birthday).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              )}
              {person.deathday && (
                <span className="nb-badge bg-muted px-2.5 py-1 text-xs font-black">
                  Died: {new Date(person.deathday).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              )}
              {age !== null && (
                <span className="nb-badge bg-muted px-2.5 py-1 text-xs font-black">
                  {person.deathday ? `Aged ${age}` : `${age} years old`}
                </span>
              )}
            </div>

            <h1 className="text-3xl font-black uppercase tracking-tight sm:text-4xl lg:text-5xl">
              {person.name}
            </h1>

            {person.placeOfBirth && (
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground sm:justify-start">
                <Icon icon="mdi:map-marker-outline" className="size-4" />
                <span>{person.placeOfBirth}</span>
              </div>
            )}

            {person.biography && (
              <div className="space-y-2">
                <h2 className="inline-block border-b-[3px] border-[var(--nb-shadow)] text-sm font-black uppercase tracking-wider">
                  Biography
                </h2>
                <p className="text-justify leading-relaxed text-muted-foreground">
                  {person.biography}
                </p>
              </div>
            )}

            {person.alsoKnownAs.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                {person.alsoKnownAs.slice(0, 5).map((name) => (
                  <span
                    key={name}
                    className="nb-badge bg-muted px-2 py-1 text-xs font-black"
                  >
                    {name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
