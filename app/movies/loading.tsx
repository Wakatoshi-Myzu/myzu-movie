import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { MovieGridSkeleton } from "@/components/movie/movie-grid-skeleton";

export default function MoviesLoading() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8 space-y-3">
            <div className="h-8 w-48 animate-pulse rounded-lg border-[3px] border-black bg-muted nb-shadow" />
            <div className="h-4 w-72 animate-pulse rounded-lg border-[2px] border-black bg-muted nb-shadow-sm" />
          </div>
          <MovieGridSkeleton count={18} />
        </div>
      </main>
      <Footer />
    </>
  );
}
