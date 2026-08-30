import Link from "next/link";
import { Icon } from "@iconify/react";

export default function TvShowNotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <div className="nb-card max-w-md bg-card p-8 text-center">
        <Icon
          icon="mdi:television-off"
          className="mx-auto mb-6 size-16 text-muted-foreground"
        />
        <h1 className="mb-2 text-2xl font-black uppercase">TV Show Not Found</h1>
        <p className="mb-6 text-muted-foreground">
          The TV show you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Link
          href="/tv"
          className="nb-btn nb-on-primary mx-auto inline-flex items-center gap-2 bg-primary px-5 py-2.5 text-sm text-primary-foreground"
        >
          <Icon icon="mdi:television" className="size-4" />
          BROWSE TV SHOWS
        </Link>
      </div>
    </div>
  );
}
