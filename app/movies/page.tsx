import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { MovieList } from "@/app/movies/_components/movie-list";
import { Suspense } from "react";

const VALID_CATEGORIES = ["popular", "now-playing", "upcoming"] as const;

type ValidCategory = (typeof VALID_CATEGORIES)[number];

interface MoviesPageProps {
  searchParams: Promise<{ category?: string }>;
}

export async function generateMetadata({ searchParams }: MoviesPageProps) {
  const params = await searchParams;
  const category = VALID_CATEGORIES.includes(params.category as ValidCategory)
    ? (params.category as ValidCategory)
    : "popular";

  const titles: Record<ValidCategory, string> = {
    popular: "Popular Movies",
    "now-playing": "Now Playing",
    upcoming: "Upcoming Movies",
  };

  return {
    title: `${titles[category]} | Movie Archive`,
    description: `Browse ${titles[category].toLowerCase()} on Movie Archive.`,
  };
}

export default async function MoviesPage({ searchParams }: MoviesPageProps) {
  const params = await searchParams;
  const category = VALID_CATEGORIES.includes(params.category as ValidCategory)
    ? (params.category as ValidCategory)
    : "popular";

  return (
    <>
      <Header />
      <main className="flex-1">
        <Suspense fallback={<MoviesLoadingSkeleton />}>
          <MovieList category={category} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

function MoviesLoadingSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 space-y-3">
        <div className="h-8 w-48 animate-pulse rounded-lg border-[3px] border-black bg-muted nb-shadow" />
        <div className="h-4 w-72 animate-pulse rounded-lg border-[2px] border-black bg-muted nb-shadow-sm" />
      </div>
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} className="nb-card overflow-hidden bg-card">
            <div className="aspect-[2/3] w-full animate-pulse border-b-[3px] border-black bg-muted" />
            <div className="p-3 space-y-2">
              <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
              <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
