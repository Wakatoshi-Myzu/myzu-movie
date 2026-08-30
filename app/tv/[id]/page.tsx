import { notFound } from "next/navigation";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { getTvSeriesDetails } from "@/lib/tmdb/server";
import { TvSeriesHero } from "./_partials/tv-series-hero";
import { TvSeriesInfo } from "./_partials/tv-series-info";
import { TvSeriesSeasons } from "./_partials/tv-series-seasons";

interface TvPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: TvPageProps) {
  const { id } = await params;
  const tvId = Number(id);

  if (isNaN(tvId)) {
    return { title: "TV Show Not Found" };
  }

  const tvShow = await getTvSeriesDetails(tvId).catch(() => null);

  if (!tvShow) {
    return { title: "TV Show Not Found" };
  }

  return {
    title: `${tvShow.name} (${new Date(tvShow.firstAirDate).getFullYear()}) | TV Archive`,
    description: tvShow.overview,
  };
}

export default async function TvShowPage({ params }: TvPageProps) {
  const { id } = await params;
  const tvId = Number(id);

  if (isNaN(tvId)) {
    notFound();
  }

  const tvShow = await getTvSeriesDetails(tvId).catch(() => null);

  if (!tvShow) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        <TvSeriesHero tvShow={tvShow} />
        <TvSeriesInfo tvShow={tvShow} />
        <div className="mx-auto max-w-7xl space-y-12 px-4 pb-12 sm:px-6 lg:px-8">
          <TvSeriesSeasons seasons={tvShow.seasons} tvShowId={tvShow.id} />
        </div>
      </main>
      <Footer />
    </>
  );
}
