export default function MovieLoading() {
  return (
    <div className="flex-1">
      <div className="relative h-[50vh]">
        <div className="h-full w-full animate-pulse bg-muted" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <div className="h-8 w-32 animate-pulse rounded-lg border-[3px] border-black bg-muted nb-shadow" />
            <div className="space-y-3">
              <div className="h-4 w-full animate-pulse rounded-lg border-[2px] border-black bg-muted nb-shadow-sm" />
              <div className="h-4 w-full animate-pulse rounded-lg border-[2px] border-black bg-muted nb-shadow-sm" />
              <div className="h-4 w-3/4 animate-pulse rounded-lg border-[2px] border-black bg-muted nb-shadow-sm" />
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="nb-card flex items-center gap-3 bg-card p-3">
                  <div className="size-12 animate-pulse rounded-full border-[2.5px] border-black bg-muted nb-shadow-sm" />
                  <div className="space-y-2">
                    <div className="h-3 w-20 animate-pulse rounded border-[2px] border-black bg-muted nb-shadow-sm" />
                    <div className="h-3 w-16 animate-pulse rounded border-[2px] border-black bg-muted nb-shadow-sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div className="h-6 w-24 animate-pulse rounded-lg border-[3px] border-black bg-muted nb-shadow" />
            <div className="space-y-3">
              <div className="h-4 w-full animate-pulse rounded-lg border-[2px] border-black bg-muted nb-shadow-sm" />
              <div className="h-4 w-full animate-pulse rounded-lg border-[2px] border-black bg-muted nb-shadow-sm" />
              <div className="h-4 w-2/3 animate-pulse rounded-lg border-[2px] border-black bg-muted nb-shadow-sm" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
