export function MovieCardSkeleton() {
  return (
    <div className="nb-card overflow-hidden bg-card">
      <div className="aspect-[2/3] w-full animate-pulse border-b-[3px] border-black bg-muted" />
      <div className="p-3 space-y-2">
        <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}
