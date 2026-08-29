import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { HeroSection } from "@/app/(home)/_partials/hero-section";
import { MovieSection } from "@/app/(home)/_partials/movie-section";
import { TrendingSection } from "@/app/(home)/_components/trending-section";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />

        <div className="mx-auto max-w-7xl space-y-12 px-4 py-12 sm:px-6 lg:px-8">
          <TrendingSection />
          <MovieSection
            type="now-playing"
            title="Now Playing"
            href="/movies?category=now-playing"
          />
          <MovieSection
            type="popular"
            title="Popular"
            href="/movies?category=popular"
          />
          <MovieSection
            type="upcoming"
            title="Upcoming"
            href="/movies?category=upcoming"
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
