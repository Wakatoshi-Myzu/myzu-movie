import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getProfileUrl } from "@/lib/tmdb/image";
import type { MovieDetail, MovieCredits } from "@/lib/tmdb/mapper";

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

export function MovieInfo({ movie, credits }: MovieInfoProps) {
  const topCast = credits.cast.slice(0, 6);

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
              <h2 className="mb-4 inline-block border-b-[3px] border-[var(--nb-shadow)] text-xl font-black uppercase tracking-tight">
                Cast
              </h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {topCast.map((person) => (
                  <div
                    key={person.id}
                    className="nb-card flex items-center gap-3 bg-card p-3"
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
                      <p className="truncate text-sm font-black">
                        {person.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {person.character}
                      </p>
                    </div>
                  </div>
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
    </div>
  );
}
