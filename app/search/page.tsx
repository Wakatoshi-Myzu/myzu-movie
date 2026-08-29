import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { SearchResults } from "./_components/search-results";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q || "";

  return (
    <>
      <Header />
      <main className="flex-1">
        <SearchResults query={query} />
      </main>
      <Footer />
    </>
  );
}
