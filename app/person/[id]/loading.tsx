import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { Skeleton } from "@/components/ui/skeleton";

export default function PersonLoading() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-background">
          <div className="mx-auto max-w-7xl px-4 pt-20 pb-12 sm:px-6 sm:pt-24 lg:px-8">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
              <div className="w-40 shrink-0 sm:w-48 lg:w-56">
                <Skeleton className="aspect-[2/3] w-full rounded-lg" />
              </div>
              <div className="max-w-2xl flex-1 space-y-4">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-12 w-64" />
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-20 w-full" />
              </div>
            </div>
          </div>
        </section>
        <div className="mx-auto max-w-7xl space-y-12 px-4 pb-12 sm:px-6 lg:px-8">
          <div className="space-y-4">
            <Skeleton className="h-8 w-40" />
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
