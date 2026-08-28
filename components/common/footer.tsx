import { Icon } from "@iconify/react";

export function Footer() {
  return (
    <footer className="nb-border border-t-[3px] border-t-black bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-muted-foreground">
            <div className="nb-on-primary nb-shadow-sm flex size-6 items-center justify-center rounded-md border-[2px] border-[var(--nb-shadow)] bg-primary">
              <Icon icon="mdi:filmstrip" className="size-3 text-primary-foreground" />
            </div>
            <span>Movie Archive</span>
          </div>

          <div className="flex flex-col items-center gap-2 text-xs text-muted-foreground sm:items-end">
            <p>
              This product uses the TMDB API but is not endorsed or certified
              by TMDB.
            </p>
            <div className="flex items-center gap-1">
              <Icon icon="mdi:open-in-new" className="size-3" />
              <a
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline underline-offset-2 hover:text-foreground"
              >
                The Movie Database
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
