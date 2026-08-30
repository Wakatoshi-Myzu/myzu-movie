"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Icon } from "@iconify/react";

function getBackUrl(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length <= 1) return "/";
  return "/" + segments.slice(0, -1).join("/");
}

export function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const isHomePage = pathname === "/";
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("q") || ""
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const mobileSearchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (mobileSearchOpen && mobileSearchRef.current) {
      mobileSearchRef.current.focus();
    }
  }, [mobileSearchOpen]);

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileSearchOpen(false);
  }, [pathname]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      setMobileSearchOpen(false);
      setMobileMenuOpen(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  }

  const navLinks = (
    <>
      <Link
        href="/"
        className="nb-border-sm flex items-center gap-1.5 rounded-lg bg-background px-3 py-1.5 text-sm font-black uppercase tracking-wider nb-shadow-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_var(--nb-shadow)]"
        onClick={() => setMobileMenuOpen(false)}
      >
        <Icon icon="mdi:home" className="size-4" />
        HOME
      </Link>
      <Link
        href="/tv"
        className="nb-border-sm flex items-center gap-1.5 rounded-lg bg-background px-3 py-1.5 text-sm font-black uppercase tracking-wider nb-shadow-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_var(--nb-shadow)]"
        onClick={() => setMobileMenuOpen(false)}
      >
        <Icon icon="mdi:television" className="size-4" />
        TV
      </Link>
      <Link
        href="/people"
        className="nb-border-sm flex items-center gap-1.5 rounded-lg bg-background px-3 py-1.5 text-sm font-black uppercase tracking-wider nb-shadow-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_var(--nb-shadow)]"
        onClick={() => setMobileMenuOpen(false)}
      >
        <Icon icon="mdi:account-group" className="size-4" />
        PEOPLE
      </Link>
    </>
  );

  return (
    <header className="nb-border sticky top-0 z-50 bg-background/95 backdrop-blur-sm shadow-[0_4px_0px_var(--nb-shadow)]">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {!isHomePage ? (
          <Link
            href={getBackUrl(pathname)}
            className="nb-border-sm nb-shadow-sm inline-flex items-center gap-1.5 rounded-lg bg-background px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_var(--nb-shadow)]"
          >
            <Icon icon="mdi:arrow-left" className="size-4" />
            BACK
          </Link>
        ) : (
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-black tracking-tight"
          >
            <div className="nb-on-primary flex size-8 items-center justify-center rounded-lg border-[2.5px] border-[var(--nb-shadow)] bg-primary nb-shadow-sm">
              <Icon icon="mdi:filmstrip" className="size-5 text-primary-foreground" />
            </div>
            <span className="text-primary">MOVIE</span>
            <span className="hidden rounded-md border-[2.5px] border-[var(--nb-shadow)] bg-muted px-2 py-0.5 text-xs font-black nb-shadow-sm sm:inline">
              ARCHIVE
            </span>
          </Link>
        )}

        {/* Desktop nav */}
        <nav className="hidden items-center gap-3 sm:flex">
          <form onSubmit={handleSearch} className="flex items-center">
            <div className="nb-border-sm flex items-center rounded-lg bg-background nb-shadow-sm">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies..."
                className="w-48 rounded-l-lg bg-transparent px-3 py-1.5 text-sm font-medium outline-none placeholder:text-muted-foreground lg:w-56"
              />
              <button
                type="submit"
                className="flex items-center justify-center rounded-r-lg border-l-[2.5px] border-[var(--nb-shadow)] bg-muted px-2.5 py-1.5 transition-colors hover:bg-accent"
              >
                <Icon icon="mdi:magnify" className="size-4 text-foreground" />
              </button>
            </div>
          </form>
          {navLinks}
        </nav>

        {/* Mobile nav */}
        <nav className="flex items-center gap-2 sm:hidden">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setMobileSearchOpen(!mobileSearchOpen);
            }}
            className="nb-border-sm flex size-9 items-center justify-center rounded-lg bg-background nb-shadow-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_var(--nb-shadow)]"
          >
            <Icon
              icon={mobileSearchOpen ? "mdi:close" : "mdi:magnify"}
              className="size-4"
            />
          </button>
          <button
            onClick={() => {
              setMobileSearchOpen(false);
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="nb-border-sm flex size-9 items-center justify-center rounded-lg bg-background nb-shadow-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_var(--nb-shadow)]"
          >
            <Icon
              icon={mobileMenuOpen ? "mdi:close" : "mdi:menu"}
              className="size-4"
            />
          </button>
        </nav>
      </div>

      {/* Mobile search bar */}
      {mobileSearchOpen && (
        <div className="border-t-[3px] border-[var(--nb-shadow)] bg-background px-4 py-3 sm:hidden">
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <div className="nb-border-sm flex flex-1 items-center rounded-lg bg-background nb-shadow-sm">
              <input
                ref={mobileSearchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies..."
                className="flex-1 rounded-l-lg bg-transparent px-3 py-2 text-sm font-medium outline-none placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                className="flex items-center justify-center rounded-r-lg border-l-[2.5px] border-[var(--nb-shadow)] bg-muted px-3 py-2 transition-colors hover:bg-accent"
              >
                <Icon icon="mdi:magnify" className="size-4 text-foreground" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t-[3px] border-[var(--nb-shadow)] bg-background px-4 py-4 sm:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks}
          </nav>
        </div>
      )}
    </header>
  );
}
