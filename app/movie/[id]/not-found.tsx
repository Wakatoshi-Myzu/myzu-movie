import Link from "next/link";
import { Icon } from "@iconify/react";

export default function MovieNotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <div className="nb-card max-w-md bg-card p-8 text-center">
        <Icon
          icon="mdi:movie-open-outline"
          className="mx-auto mb-6 size-16 text-muted-foreground"
        />
        <h1 className="mb-2 text-2xl font-black uppercase">Movie Not Found</h1>
        <p className="mb-6 text-muted-foreground">
          The movie you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Link
          href="/"
          className="nb-btn nb-on-primary mx-auto inline-flex items-center gap-2 bg-primary px-5 py-2.5 text-sm text-primary-foreground"
        >
          <Icon icon="mdi:home" className="size-4" />
          BACK TO HOME
        </Link>
      </div>
    </div>
  );
}
