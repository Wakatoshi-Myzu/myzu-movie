import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { PeopleList } from "@/app/people/_components/people-list";
import { Suspense } from "react";

interface PeoplePageProps {
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ searchParams }: PeoplePageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;

  return {
    title: `Popular People ${page > 1 ? `- Page ${page}` : ""} | Movie Archive`,
    description: "Browse popular actors and filmmakers on Movie Archive.",
  };
}

export default async function PeoplePage({ searchParams }: PeoplePageProps) {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Suspense fallback={<PeopleLoadingSkeleton />}>
          <PeopleList />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

function PeopleLoadingSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 space-y-3">
        <div className="h-8 w-48 animate-pulse rounded-lg border-[3px] border-[var(--nb-shadow)] bg-muted nb-shadow" />
        <div className="h-4 w-72 animate-pulse rounded-lg border-[2px] border-[var(--nb-shadow)] bg-muted nb-shadow-sm" />
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
