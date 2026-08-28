"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { BackButton } from "@/app/movie/[id]/_components/back-button";

export function Header() {
  const pathname = usePathname();
  const isMovieDetail = /^\/movie\/\d+/.test(pathname);

  return (
    <header className="nb-border sticky top-0 z-50 bg-background/95 backdrop-blur-sm shadow-[0_4px_0px_#000000]">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {isMovieDetail ? (
          <BackButton />
        ) : (
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-black tracking-tight"
          >
            <div className="flex size-8 items-center justify-center rounded-lg border-[2.5px] border-black bg-primary nb-shadow-sm">
              <Icon icon="mdi:filmstrip" className="size-5 text-primary-foreground" />
            </div>
            <span className="text-primary">MOVIE</span>
            <span className="rounded-md border-[2.5px] border-black bg-muted px-2 py-0.5 text-xs font-black nb-shadow-sm">
              ARCHIVE
            </span>
          </Link>
        )}

        <nav className="flex items-center gap-3">
          <Link
            href="/"
            className="nb-border-sm rounded-lg bg-background px-3 py-1.5 text-sm font-black uppercase tracking-wider nb-shadow-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#000000]"
          >
            HOME
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
