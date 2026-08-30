import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { TvSeriesList } from "./_components/tv-series-list";
import { Suspense } from "react";

const VALID_CATEGORIES = ["popular", "airing-today", "on-the-air", "top-rated"] as const;
type Category = (typeof VALID_CATEGORIES)[number];

const CATEGORY_CONFIG: Record<Category, { label: string; icon: string }> = {
  popular: { label: "Popular", icon: "mdi:trending-up" },
  "airing-today": { label: "Airing Today", icon: "mdi:calendar-today" },
  "on-the-air": { label: "On The Air", icon: "mdi:television-play" },
  "top-rated": { label: "Top Rated", icon: "mdi:star" },
};

interface TvPageProps {
  searchParams: Promise<{ category?: string }>;
}

export async function generateMetadata({ searchParams }: TvPageProps) {
  const params = await searchParams;
  const category = (params.category as Category) || "popular";
  const config = CATEGORY_CONFIG[category] || CATEGORY_CONFIG.popular;

  return {
    title: `${config.label} TV Shows | TV Archive`,
    description: `Browse ${config.label.toLowerCase()} TV shows on TV Archive.`,
  };
}

export default async function TvPage({ searchParams }: TvPageProps) {
  const params = await searchParams;
  const category = VALID_CATEGORIES.includes(params.category as Category)
    ? (params.category as Category)
    : "popular";

  const config = CATEGORY_CONFIG[category];

  return (
    <>
      <Header />
      <main className="flex-1">
        <Suspense fallback={<TvLoadingSkeleton />}>
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-8 space-y-3">
              <div className="flex items-center gap-3">
                <div className="nb-on-primary nb-shadow-sm flex size-8 items-center justify-center rounded-lg border-[2.5px] border-[var(--nb-shadow)] bg-primary">
                  <span className="text-sm text-primary-foreground">📺</span>
                </div>
                <h1 className="text-2xl font-black uppercase tracking-tight sm:text-3xl">
                  {config.label} TV Shows
                </h1>
              </div>
              <div className="flex flex-wrap gap-2">
                {VALID_CATEGORIES.map((cat) => {
                  const catConfig = CATEGORY_CONFIG[cat];
                  return (
                    <a
                      key={cat}
                      href={`/tv?category=${cat}`}
                      className={`nb-border-sm nb-shadow-sm inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_var(--nb-shadow)] ${
                        category === cat
                          ? "nb-on-primary bg-primary text-primary-foreground"
                          : "bg-background"
                      }`}
                    >
                      {catConfig.label}
                    </a>
                  );
                })}
              </div>
            </div>
            <TvSeriesList category={category} />
          </div>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

function TvLoadingSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 space-y-3">
        <div className="h-8 w-48 animate-pulse rounded-lg border-[3px] border-[var(--nb-shadow)] bg-muted nb-shadow" />
        <div className="flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-8 w-24 animate-pulse rounded-lg border-[2px] border-[var(--nb-shadow)] bg-muted nb-shadow-sm" />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} className="nb-card overflow-hidden bg-card">
            <div className="aspect-[2/3] w-full animate-pulse border-b-[3px] border-[var(--nb-shadow)] bg-muted" />
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
