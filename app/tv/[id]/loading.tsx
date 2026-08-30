export default function TvShowLoading() {
  return (
    <div className="flex-1">
      {/* Hero skeleton */}
      <div className="relative h-[50vh]">
        <div className="h-full w-full animate-pulse bg-muted" />
      </div>

      {/* Info skeleton */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            {/* Overview skeleton */}
            <div className="h-8 w-32 animate-pulse rounded-lg border-[3px] border-[var(--nb-shadow)] bg-muted nb-shadow" />
            <div className="space-y-3">
              <div className="h-4 w-full animate-pulse rounded-lg border-[2px] border-[var(--nb-shadow)] bg-muted nb-shadow-sm" />
              <div className="h-4 w-full animate-pulse rounded-lg border-[2px] border-[var(--nb-shadow)] bg-muted nb-shadow-sm" />
              <div className="h-4 w-3/4 animate-pulse rounded-lg border-[2px] border-[var(--nb-shadow)] bg-muted nb-shadow-sm" />
            </div>

            {/* Networks skeleton */}
            <div className="h-8 w-32 animate-pulse rounded-lg border-[3px] border-[var(--nb-shadow)] bg-muted nb-shadow" />
            <div className="flex gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-6 w-20 animate-pulse rounded-lg border-[2px] border-[var(--nb-shadow)] bg-muted nb-shadow-sm" />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {/* Details skeleton */}
            <div className="h-6 w-24 animate-pulse rounded-lg border-[3px] border-[var(--nb-shadow)] bg-muted nb-shadow" />
            <div className="space-y-3">
              <div className="h-4 w-full animate-pulse rounded-lg border-[2px] border-[var(--nb-shadow)] bg-muted nb-shadow-sm" />
              <div className="h-4 w-full animate-pulse rounded-lg border-[2px] border-[var(--nb-shadow)] bg-muted nb-shadow-sm" />
              <div className="h-4 w-full animate-pulse rounded-lg border-[2px] border-[var(--nb-shadow)] bg-muted nb-shadow-sm" />
            </div>
          </div>
        </div>

        {/* Seasons skeleton */}
        <div className="mt-12">
          <div className="h-8 w-40 animate-pulse rounded-lg border-[3px] border-[var(--nb-shadow)] bg-muted nb-shadow" />
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="nb-card flex gap-4 bg-card p-4">
                <div className="h-24 w-16 animate-pulse rounded-t-[9px] border-b-[3px] border-[var(--nb-shadow)] bg-muted" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                  <div className="h-3 w-16 animate-pulse rounded bg-muted" />
                  <div className="h-3 w-full animate-pulse rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
