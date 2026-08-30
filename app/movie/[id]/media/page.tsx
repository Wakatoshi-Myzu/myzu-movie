import { notFound } from "next/navigation";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { getMovieDetails } from "@/lib/tmdb/server";
import { MovieMediaAll } from "./_components/movie-media-all";

interface MovieMediaPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string }>;
}

export async function generateMetadata({ params }: MovieMediaPageProps) {
  const { id } = await params;
  const movieId = Number(id);

  if (isNaN(movieId)) {
    return { title: "Movie Not Found" };
  }

  const movie = await getMovieDetails(movieId).catch(() => null);

  if (!movie) {
    return { title: "Movie Not Found" };
  }

  return {
    title: `Media - ${movie.title} | Movie Archive`,
    description: `Browse all media for ${movie.title}`,
  };
}

export default async function MovieMediaPage({ params, searchParams }: MovieMediaPageProps) {
  const { id } = await params;
  const { tab } = await searchParams;
  const movieId = Number(id);

  if (isNaN(movieId)) {
    notFound();
  }

  const movie = await getMovieDetails(movieId).catch(() => null);

  if (!movie) {
    notFound();
  }

  const activeTab = (tab as "backdrops" | "posters" | "videos") || "backdrops";

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8 space-y-3">
            <Link
              href={`/movie/${movieId}`}
              className="nb-border-sm nb-shadow-sm inline-flex items-center gap-1.5 rounded-lg bg-background px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_var(--nb-shadow)]"
            >
              <Icon icon="mdi:arrow-left" className="size-4" />
              Back to Movie
            </Link>
            <div className="flex items-center gap-3">
              <div className="nb-on-primary nb-shadow-sm flex size-8 items-center justify-center rounded-lg border-[2.5px] border-[var(--nb-shadow)] bg-primary">
                <Icon icon="mdi:image-multiple" className="size-4 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-black uppercase tracking-tight sm:text-3xl">
                {movie.title} - Media
              </h1>
            </div>
          </div>
          <MovieMediaAll movieId={movieId} initialTab={activeTab} />
        </div>
      </main>
      <Footer />
    </>
  );
}
