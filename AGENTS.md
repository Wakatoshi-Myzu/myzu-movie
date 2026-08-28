# AGENTS.md --- Movie Discovery Web

## 1. Project Overview

Build a modern movie discovery website using **Next.js App Router** and
the **TMDB API**.

The website is a public, read-only movie discovery experience. There is
**no authentication, login, registration, user account, or backend user
management**.

The primary goal is to present movie information in a visually
distinctive, editorial, modern neo-brutalist interface rather than
looking like a generic SaaS dashboard or an AI-generated template.

### Product direction

The visual concept is:

> **Modern Neo-Brutalist Editorial Movie Archive**

The design should feel:

-   Modern
-   Bold
-   Editorial
-   Cinematic
-   Slightly raw
-   Intentional
-   Premium without becoming overly polished
-   Distinctive without being chaotic
-   Strong in both light and dark mode

Movie artwork, typography, composition, and information hierarchy are
the primary visual elements.

Do not make the website look like a generic Netflix clone, SaaS
dashboard, or AI-generated landing page.

------------------------------------------------------------------------

# 2. Core Technology Stack

Use the following technologies unless there is a strong technical reason
not to:

-   **Next.js** with App Router
-   **TypeScript**
-   **Tailwind CSS**
-   **shadcn/ui**
-   **TanStack Query**
-   **Axios**
-   **TMDB API**
-   **next-themes** for theme management
-   **@iconify/react** for icons
-   **Lucide React is not allowed**

### General principle

Prefer the simplest architecture that solves the problem correctly.

Do not introduce unnecessary:

-   State management libraries
-   Repository layers
-   Service abstractions
-   Dependency injection
-   Factories
-   Complex design-system abstractions
-   Additional API clients

Avoid over-engineering.

------------------------------------------------------------------------

# 3. Non-Negotiable Rules

The following rules must always be followed.

## Styling

-   Use Tailwind CSS.
-   Use shadcn/ui where an appropriate component already exists.
-   Do not use arbitrary Tailwind values for colors.
-   Do not use arbitrary Tailwind values for spacing, sizing, radius,
    shadows, or other design values unless absolutely necessary.
-   Prefer existing Tailwind tokens and project CSS variables.
-   Do not hardcode design colors directly inside components.
-   Do not create random one-off colors inside components.

### Forbidden examples

``` tsx
className="bg-[#0f0f0f]"
className="text-[#95ff4f]"
className="border-[#111]"
className="w-[387px]"
className="mt-[17px]"
```

### Preferred examples

``` tsx
className="bg-background"
className="text-foreground"
className="bg-primary"
className="text-primary-foreground"
className="border-border"
className="text-muted-foreground"
className="size-5"
className="gap-4"
```

If a design value does not exist, first determine whether it should
become a reusable design token rather than introducing an arbitrary
value.

------------------------------------------------------------------------

# 4. Color System

Green is the primary visual accent.

However, green must **not** be used everywhere.

The interface should primarily use neutral surfaces and typography, with
green acting as a deliberate accent.

## Light mode

Use a warm or slightly softened neutral background rather than pure
white where appropriate.

Conceptually:

-   Background → warm neutral
-   Foreground → near-black
-   Card → neutral surface
-   Border → strong neutral
-   Primary → deep/strong green
-   Accent → vivid green
-   Muted → soft neutral
-   Rating → green or a dedicated rating token

## Dark mode

Use a near-black or very dark green-tinted background rather than pure
black everywhere.

Conceptually:

-   Background → near-black / green-black
-   Foreground → warm white
-   Card → slightly elevated dark neutral
-   Border → restrained muted light
-   Primary → vivid green
-   Accent → vivid green
-   Muted → dark neutral
-   Rating → green

## Semantic tokens

Define colors in `globals.css` using CSS variables.

At minimum support the standard shadcn semantic tokens:

-   `background`
-   `foreground`
-   `card`
-   `card-foreground`
-   `popover`
-   `popover-foreground`
-   `primary`
-   `primary-foreground`
-   `secondary`
-   `secondary-foreground`
-   `muted`
-   `muted-foreground`
-   `accent`
-   `accent-foreground`
-   `destructive`
-   `border`
-   `input`
-   `ring`

Movie-specific semantic tokens may be added when genuinely useful, for
example:

-   `rating`
-   `rating-foreground`

Do not create a new color token for every component.

------------------------------------------------------------------------

# 5. Dark Mode

The application must support:

-   Light
-   Dark
-   System

Use `next-themes`.

The default behavior should respect the user's system preference.

Do not duplicate theme-specific classes throughout the application when
CSS variables can handle the difference.

Prefer:

``` tsx
className="bg-background text-foreground"
```

instead of excessive:

``` tsx
className="bg-white text-black dark:bg-black dark:text-white"
```

The design should look intentionally designed in both modes, not like
dark mode was added afterward.

------------------------------------------------------------------------

# 6. Typography

Typography is a major part of the visual identity.

Use a combination of:

1.  Strong display typography for major headings.
2.  Neutral readable typography for body content.
3.  Monospace or compact typography for metadata where appropriate.

Movie metadata can use an editorial/technical treatment.

Examples:

``` text
RELEASED
AUG 21, 2026

RUNTIME
02H 14M

RATING
8.4 / 10
```

Use uppercase and compact metadata selectively.

Do not make every text element uppercase.

Do not use oversized typography everywhere.

Typography should create hierarchy, not visual noise.

------------------------------------------------------------------------

# 7. Modern Neo-Brutalist Design Rules

Neo-brutalism should be treated as a **design language**, not a
collection of gimmicks.

## Use

-   Strong typography
-   Clear visual hierarchy
-   Selective borders
-   Selective offset shadows
-   Flat surfaces
-   Strong contrast
-   Intentional asymmetry
-   Editorial layouts
-   Distinctive buttons
-   Strong image presentation
-   Carefully controlled visual tension

## Avoid

-   Excessive rounded cards
-   Excessive box shadows
-   Thick borders on every element
-   Random rotations
-   Random skewing
-   Excessive gradients
-   Glassmorphism
-   Decorative blobs
-   Floating 3D objects
-   Generic SaaS cards
-   Excessive pills
-   Excessive badges
-   Excessive animation
-   Excessive whitespace
-   UI elements that exist only for decoration

### Border rule

Not every component needs a border.

Use borders intentionally for:

-   Navigation
-   Important cards
-   Buttons
-   Dividers
-   Editorial sections
-   Interactive controls

### Radius rule

Use restrained radii.

Avoid making every component:

``` text
rounded-xl
rounded-2xl
rounded-3xl
```

Prefer subtle or square-ish geometry where it fits the design.

### Shadow rule

Use offset shadows selectively.

A button may use a small neo-brutalist offset shadow.

A movie poster or card does not need a large shadow by default.

------------------------------------------------------------------------

# 8. Anti-AI-Slop Rules

The final UI must not feel like an AI-generated generic website.

Never blindly follow common AI UI patterns.

## Do not

-   Build a generic SaaS dashboard.
-   Use purple/blue gradients as the default visual solution.
-   Use glassmorphism.
-   Put every section inside a rounded card.
-   Put every card inside another card.
-   Add decorative blobs.
-   Add meaningless 3D illustrations.
-   Add random floating shapes.
-   Use excessive gradient backgrounds.
-   Use excessive pills.
-   Use excessive badges.
-   Use excessive drop shadows.
-   Use random rotations.
-   Animate everything.
-   Use emojis as UI icons.
-   Add UI elements without a clear product purpose.
-   Make every section look identical.
-   Use a generic centered hero with three feature cards just because it
    is common.
-   Copy the visual structure of a typical SaaS landing page.

## Prefer

-   Editorial composition.
-   Strong typography.
-   Intentional asymmetry.
-   Cinematic imagery.
-   Distinctive section layouts.
-   Varied but consistent composition.
-   Strong alignment.
-   Clear hierarchy.
-   Controlled density.
-   Large movie artwork.
-   Useful metadata.
-   Small visual surprises with a clear purpose.

Every visual element should answer:

> Why does this exist?

If there is no good answer, remove it.

------------------------------------------------------------------------

# 9. Movie Artwork Is the Main Visual

Movie posters and backdrops should be the primary visual assets.

Do not bury movie artwork under excessive UI decoration.

The website should feel like a movie archive/discovery platform, not a
dashboard that happens to contain posters.

Use `next/image`.

Create a centralized TMDB image helper.

Example responsibility:

``` text
lib/tmdb/image.ts
```

It should handle poster, backdrop, and profile image URL construction.

------------------------------------------------------------------------

# 10. Icon System

Use **@iconify/react**.

Do not use Lucide React.

Default icon set:

> Material Design Icons (`mdi`)

Examples:

``` tsx
import { Icon } from "@iconify/react";

<Icon icon="mdi:magnify" className="size-5" />
<Icon icon="mdi:star" className="size-4" />
<Icon icon="mdi:play" className="size-5" />
```

For brand icons, `simple-icons` may be used when appropriate.

## Icon rules

-   Do not use emoji as UI icons.
-   Use Tailwind sizing classes.
-   Avoid arbitrary icon sizes.
-   Icon colors must follow semantic color tokens.
-   Do not randomly mix multiple icon families.
-   Keep icon style visually consistent.

Preferred:

``` tsx
<Icon
  icon="mdi:star"
  className="size-4 text-rating"
/>
```

Avoid:

``` tsx
<Icon
  icon="mdi:star"
  width="17px"
  color="#f5c518"
/>
```

------------------------------------------------------------------------

# 11. Component Architecture

Use three levels of reusable UI.

## Global UI

``` text
components/ui/
```

Contains shadcn/ui and generic primitives.

Examples:

-   Button
-   Input
-   Dialog
-   Badge
-   Skeleton
-   Dropdown
-   Sheet

These components must remain generic.

## Common application components

``` text
components/common/
```

Contains components reused throughout the application but which
understand the application context.

Examples:

-   Header
-   Footer
-   Logo
-   Theme Toggle
-   Search Bar
-   Empty State
-   Error State

## Domain components

``` text
components/movie/
```

Contains reusable movie-specific components.

Examples:

-   MovieCard
-   MovieGrid
-   MoviePoster
-   MovieRating
-   MovieMeta

A component belongs here when it is used by multiple pages/features but
is still specific to the movie domain.

------------------------------------------------------------------------

# 12. Page-Specific Components

For components used only by a specific page, keep them close to that
page.

Use:

``` text
_components/
_partials/
```

## `_components`

Small, page-specific building blocks.

Examples:

``` text
movie/[id]/_components/
├── cast-card.tsx
├── crew-card.tsx
├── genre-badge.tsx
├── movie-meta.tsx
└── movie-rating.tsx
```

These components should generally be small and focused.

## `_partials`

Page-level sections / composition.

Examples:

``` text
movie/[id]/_partials/
├── movie-hero.tsx
├── movie-overview.tsx
├── movie-cast.tsx
├── movie-crew.tsx
├── movie-trailer.tsx
└── similar-movies.tsx
```

A partial may be a Server Component or Client Component depending on its
actual needs.

Do not make all partials Client Components by default.

------------------------------------------------------------------------

# 13. `page.tsx` Responsibility

`page.tsx` should be a thin Server Component responsible for page
composition and server-side data requirements.

It should answer:

> What sections make up this page?

Avoid putting large UI implementations directly inside `page.tsx`.

Preferred conceptual structure:

``` tsx
export default async function MoviePage() {
  const movie = await getMovie();

  return (
    <>
      <MovieHero movie={movie} />
      <MovieOverview movie={movie} />
      <MovieCast movieId={movie.id} />
      <SimilarMovies movieId={movie.id} />
    </>
  );
}
```

Do not turn `page.tsx` into a 500-line component.

------------------------------------------------------------------------

# 14. Next.js App Router

Use App Router conventions.

Use:

-   Server Components by default
-   Client Components only when needed
-   `loading.tsx`
-   `error.tsx`
-   `not-found.tsx`
-   `generateMetadata`
-   Route Handlers under `app/api`

Avoid adding `"use client"` unless the component actually needs:

-   React state
-   Event handlers
-   Browser APIs
-   TanStack Query
-   Client-only libraries

------------------------------------------------------------------------

# 15. API Architecture

The browser must **never directly call TMDB**.

The application uses Next.js Route Handlers as an internal API layer.

Architecture:

``` text
Browser
  ↓
TanStack Query
  ↓
Axios
  ↓
Next.js /api/*
  ↓
Axios TMDB client
  ↓
TMDB API
```

This architecture exists primarily to keep the TMDB credential
server-side and to create a stable application API.

------------------------------------------------------------------------

# 16. Environment Variables & TMDB API Security

The existing `.env.example` is the **source of truth for environment variable names and available environment configuration**.

Before implementing or modifying any environment-dependent feature:

1. Inspect `.env.example`.
2. Use the variable names already defined there exactly as they are.
3. Do not invent alternative environment variable names.
4. Do not rename existing variables unless explicitly requested.
5. Do not create `NEXT_PUBLIC_` variants for server-only secrets.
6. If an additional environment variable is genuinely required, first determine whether the existing variables already cover the requirement. If not, add the new variable to `.env.example` and document its purpose.

The current TMDB environment variables are:

```env
MOVIE_TOKEN=""
MOVIE_BASE_URL=""
```

Their responsibilities are:

- `MOVIE_TOKEN` → server-side TMDB API credential.
- `MOVIE_BASE_URL` → TMDB API base URL.

Example:

```env
MOVIE_TOKEN="your-tmdb-token"
MOVIE_BASE_URL="https://api.themoviedb.org/3"
```

Do not replace these with names such as:

```env
TMDB_ACCESS_TOKEN=""
TMDB_API_KEY=""
TMDB_BASE_URL=""
NEXT_PUBLIC_MOVIE_TOKEN=""
NEXT_PUBLIC_TMDB_ACCESS_TOKEN=""
```

unless explicitly requested.

### Security

`MOVIE_TOKEN` is a server-only secret.

Never expose it through:

- Client Components
- Browser fetch calls
- Public environment variables
- HTML
- Query strings
- Client-side JavaScript bundles
- API responses
- Client-side configuration objects

The browser should communicate only with the application's internal API:

```text
/api/movies/popular
/api/movies/upcoming
/api/movies/123
/api/search?q=batman
```

The browser must never directly call TMDB with the application's credential.

The server-side TMDB Axios client should read:

```ts
process.env.MOVIE_TOKEN
```

and use:

```ts
process.env.MOVIE_BASE_URL
```

as the base URL.

Never access `MOVIE_TOKEN` from a Client Component.

`MOVIE_BASE_URL` is configuration rather than a secret, but it should remain part of the server-side TMDB integration.

--------------------

# 17. Backend Axios

Use Axios for server-side TMDB requests.

Recommended location:

``` text
lib/axios/tmdb.ts
```

Create a centralized Axios instance responsible for:

-   TMDB base URL
-   Authorization header
-   Content-Type
-   Timeout
-   Shared error handling

Conceptually:

``` text
Route Handler
    ↓
TMDB Axios Instance
    ↓
TMDB API
```

Do not create a new Axios configuration in every route.

------------------------------------------------------------------------

# 18. Next.js Route Handlers

All client-consumed endpoints should live under:

``` text
app/api/
```

Recommended structure:

``` text
app/api/
├── movies/
│   ├── popular/
│   │   └── route.ts
│   ├── now-playing/
│   │   └── route.ts
│   ├── upcoming/
│   │   └── route.ts
│   ├── top-rated/
│   │   └── route.ts
│   ├── discover/
│   │   └── route.ts
│   └── [id]/
│       ├── route.ts
│       ├── credits/
│       │   └── route.ts
│       ├── videos/
│       │   └── route.ts
│       └── similar/
│           └── route.ts
│
├── genres/
│   └── route.ts
│
└── search/
    └── route.ts
```

Route handlers should be thin.

They should:

1.  Validate query parameters.
2.  Call the appropriate TMDB function.
3.  Transform the response if necessary.
4.  Return a consistent application response.
5.  Handle errors correctly.

Do not put UI logic inside Route Handlers.

------------------------------------------------------------------------

# 19. Client API Services

The browser should communicate with the internal API through a dedicated
service layer.

Recommended:

``` text
services/
└── api/
    ├── movies.ts
    ├── genres.ts
    └── search.ts
```

Example responsibilities:

``` text
services/api/movies.ts
    ↓
GET /api/movies/popular
GET /api/movies/upcoming
GET /api/movies/:id
```

The client service must not know the TMDB token or TMDB authorization
mechanism.

------------------------------------------------------------------------

# 20. TanStack Query

Use TanStack Query for client-side data fetching and caching.

Conceptual flow:

``` text
Component
   ↓
Custom Hook
   ↓
TanStack Query
   ↓
Client API Service
   ↓
/api/*
```

Do not put Axios calls directly into visual components.

Preferred:

``` tsx
const { data, isLoading } = usePopularMovies();
```

Avoid:

``` tsx
useEffect(() => {
  axios.get("/api/movies/popular");
}, []);
```

unless there is a specific reason not to use TanStack Query.

------------------------------------------------------------------------

# 21. React Query Organization

Recommended:

``` text
lib/
└── react-query/
    ├── keys.ts
    ├── movies.ts
    ├── genres.ts
    └── search.ts
```

And:

``` text
hooks/
├── use-popular-movies.ts
├── use-upcoming-movies.ts
├── use-movie-detail.ts
├── use-movie-cast.ts
└── use-search-movies.ts
```

Keep query keys centralized.

Conceptually:

``` ts
movieKeys.popular()
movieKeys.upcoming()
movieKeys.detail(id)
movieKeys.credits(id)
movieKeys.similar(id)
```

Avoid manually recreating query-key arrays across unrelated components.

------------------------------------------------------------------------

# 22. Server Components vs Client Components

Default to Server Components.

Use Server Components for:

-   Movie detail content that does not need interaction
-   Static sections
-   Metadata
-   Initial page composition
-   Server-side TMDB requests where appropriate

Use Client Components for:

-   Search input
-   Interactive filtering
-   Pagination controls
-   Infinite scroll
-   Theme toggle
-   TanStack Query
-   Interactive trailer controls
-   Components requiring browser APIs

Do not convert an entire page into a Client Component just because one
small section needs interactivity.

------------------------------------------------------------------------

# 23. API Response Shape

Internal APIs should use a consistent application-level response format
where practical.

Success:

``` json
{
  "success": true,
  "data": {}
}
```

Error:

``` json
{
  "success": false,
  "message": "Movie not found"
}
```

Do not expose unnecessary TMDB implementation details to the client.

The internal API is an abstraction layer over TMDB.

------------------------------------------------------------------------

# 24. TMDB Data Mapping

TMDB responses may contain fields that the UI does not need.

Use a mapper when appropriate:

``` text
lib/tmdb/mapper.ts
```

Conceptually:

``` text
TMDB Response
      ↓
TMDB Mapper
      ↓
Application Model
      ↓
Client
```

For example, a movie card may only need:

``` ts
{
  id,
  title,
  poster,
  releaseDate,
  rating
}
```

Do not blindly pass massive TMDB objects through every component if only
a small subset is needed.

------------------------------------------------------------------------

# 25. URL State

Search, filters, sorting, and pagination should preferably be
represented in URL search parameters.

Examples:

``` text
/search?q=interstellar
```

``` text
/movies?genre=28&sort=popularity.desc&page=2
```

Benefits:

-   Shareable URLs
-   Browser navigation
-   Bookmarkable state
-   Refresh-safe state
-   Better discoverability
-   Easier debugging

Use `nuqs` only if URL state becomes sufficiently complex to justify it.

Do not add it solely for a trivial query parameter.

------------------------------------------------------------------------

# 26. Loading States

Every major data-driven route should provide a meaningful loading state.

Use:

``` text
loading.tsx
```

and shadcn/ui `Skeleton` where appropriate.

Do not create a completely unrelated skeleton design.

Skeletons must follow the same:

-   Surface colors
-   Border system
-   Radius system
-   Density
-   Layout

as the final UI.

------------------------------------------------------------------------

# 27. Error States

Provide useful error states.

Handle:

-   Network errors
-   TMDB errors
-   Rate limiting
-   Missing movie
-   Empty search
-   Invalid movie ID
-   Unexpected server errors

Use:

``` text
error.tsx
not-found.tsx
```

where appropriate.

Do not show raw Axios or TMDB error objects to users.

------------------------------------------------------------------------

# 28. Image Configuration

Use `next/image`.

Configure the TMDB image host with `remotePatterns` in the Next.js
configuration.

Do not disable image optimization globally just to avoid configuring
remote images.

Centralize TMDB image URL generation in:

``` text
lib/tmdb/image.ts
```

Support at least:

-   Poster
-   Backdrop
-   Profile

Provide sensible fallback behavior when TMDB returns a null image path.

Do not pass an empty image URL to `next/image`.

------------------------------------------------------------------------

# 29. SEO

Movie detail pages should have meaningful metadata.

Use:

``` tsx
generateMetadata()
```

The metadata should use movie information where available.

Example concept:

``` text
Interstellar (2014) | Movie Archive
```

Description should be based on the movie overview.

SEO is especially important for public movie detail pages.

Do not use generic metadata for every movie.

------------------------------------------------------------------------

# 30. Accessibility

Accessibility is part of the implementation, not an afterthought.

Use:

-   Semantic HTML
-   Proper heading hierarchy
-   Real buttons for actions
-   Real links for navigation
-   Accessible labels
-   Meaningful image alt text
-   Keyboard-friendly interactions
-   Visible focus states
-   Appropriate ARIA attributes where necessary

Avoid:

``` tsx
<div onClick={...}>
```

when a semantic button or link is appropriate.

Prefer:

``` tsx
<Button />
```

or:

``` tsx
<Link href="...">
```

------------------------------------------------------------------------

# 31. Responsive Design

The application must be responsive from mobile to large desktop screens.

Use a mobile-first approach.

Do not simply shrink the desktop layout.

Consider:

-   Navigation behavior
-   Poster grid density
-   Typography scale
-   Hero composition
-   Metadata wrapping
-   Search controls
-   Filter controls
-   Touch target sizes
-   Horizontal scrolling where appropriate

Mobile should feel intentionally designed.

------------------------------------------------------------------------

# 32. Layout Philosophy

Avoid making every page use the exact same layout formula.

Use a consistent design system but allow composition to vary.

The visual hierarchy should be:

``` text
Movie Artwork
      ↓
Title / Main Information
      ↓
Metadata
      ↓
Description
      ↓
Supporting Information
      ↓
Secondary Actions
```

Movie posters/backdrops should have enough visual space to be
appreciated.

------------------------------------------------------------------------

# 33. Homepage Direction

The homepage should not contain dozens of repetitive sections.

A good baseline:

``` text
Header
↓
Featured / Hero
↓
Now Playing
↓
Popular
↓
Upcoming
↓
Footer
```

Additional sections should only be added when they provide meaningful
discovery value.

Avoid:

``` text
Trending
Trending Today
Trending This Week
Popular
Most Popular
Recommended
Editor's Choice
Fan Favorites
Hidden Gems
Because You Watched
...
```

Do not fill the page just to make it longer.

------------------------------------------------------------------------

# 34. Movie Card Rules

`MovieCard` should primarily be presentational.

It should not independently fetch:

-   Movie detail
-   Cast
-   Trailer
-   Genres
-   Similar movies

Do not make every card a data-fetching component.

Prefer:

``` tsx
<MovieCard movie={movie} />
```

The parent feature/page determines the data.

A reusable movie card should work in:

-   Home
-   Movies
-   Search
-   Genre
-   Similar Movies
-   Other movie lists

------------------------------------------------------------------------

# 35. Animation

Animations should support interaction and hierarchy.

Good examples:

-   Small poster hover scale
-   Button press/offset
-   Subtle navigation transitions
-   Controlled section entrance
-   Trailer interaction

Avoid:

-   Constant bouncing
-   Excessive parallax
-   Random floating elements
-   Excessive scroll animations
-   Animation on every component
-   Animation that hurts accessibility or performance

Respect reduced-motion preferences.

------------------------------------------------------------------------

# 36. Performance

Prioritize:

-   Server Components where appropriate
-   `next/image`
-   Small Client Component boundaries
-   TanStack Query caching
-   Appropriate stale times
-   Avoiding unnecessary effects
-   Avoiding unnecessary re-renders
-   Avoiding huge client-side bundles
-   Lazy loading expensive interactive content

Do not fetch the same movie data repeatedly from unrelated components.

Do not add `useEffect` when derived state or server-side fetching can
solve the problem.

------------------------------------------------------------------------

# 37. Suggested Folder Structure

Use the following as the default structure:

``` text
src/
├── app/
│   ├── (home)/
│   │   ├── _components/
│   │   ├── _partials/
│   │   └── page.tsx
│   │
│   ├── movies/
│   │   ├── _components/
│   │   ├── _partials/
│   │   └── page.tsx
│   │
│   ├── movie/
│   │   └── [id]/
│   │       ├── _components/
│   │       ├── _partials/
│   │       ├── page.tsx
│   │       ├── loading.tsx
│   │       └── not-found.tsx
│   │
│   ├── search/
│   │   ├── _components/
│   │   ├── _partials/
│   │   └── page.tsx
│   │
│   ├── api/
│   │   ├── movies/
│   │   │   ├── popular/
│   │   │   │   └── route.ts
│   │   │   ├── now-playing/
│   │   │   │   └── route.ts
│   │   │   ├── upcoming/
│   │   │   │   └── route.ts
│   │   │   ├── top-rated/
│   │   │   │   └── route.ts
│   │   │   ├── discover/
│   │   │   │   └── route.ts
│   │   │   └── [id]/
│   │   │       ├── route.ts
│   │   │       ├── credits/
│   │   │       │   └── route.ts
│   │   │       ├── videos/
│   │   │       │   └── route.ts
│   │   │       └── similar/
│   │   │           └── route.ts
│   │   │
│   │   ├── genres/
│   │   │   └── route.ts
│   │   │
│   │   └── search/
│   │       └── route.ts
│   │
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── error.tsx
│   ├── not-found.tsx
│   ├── globals.css
│   └── favicon.ico
│
├── components/
│   ├── ui/
│   ├── common/
│   ├── movie/
│   └── icon/
│
├── hooks/
│   ├── use-popular-movies.ts
│   ├── use-upcoming-movies.ts
│   ├── use-movie-detail.ts
│   ├── use-movie-cast.ts
│   └── use-search-movies.ts
│
├── lib/
│   ├── axios/
│   │   └── tmdb.ts
│   │
│   ├── tmdb/
│   │   ├── endpoints.ts
│   │   ├── image.ts
│   │   ├── mapper.ts
│   │   └── server.ts
│   │
│   ├── react-query/
│   │   ├── keys.ts
│   │   ├── movies.ts
│   │   ├── genres.ts
│   │   └── search.ts
│   │
│   ├── constants.ts
│   └── utils.ts
│
├── providers/
│   ├── query-provider.tsx
│   └── theme-provider.tsx
│
├── services/
│   └── api/
│       ├── movies.ts
│       ├── genres.ts
│       └── search.ts
│
└── types/
    ├── movie.ts
    ├── genre.ts
    ├── api.ts
    └── response.ts
```

------------------------------------------------------------------------

# 38. Component Ownership Rules

Use this decision tree:

``` text
Is it generic UI?
        ↓
components/ui

Is it reused throughout the application?
        ↓
components/common

Is it movie-specific and reused across pages?
        ↓
components/movie

Is it only used by one page?
        ↓
app/**/_components

Is it a section/page-level composition?
        ↓
app/**/_partials
```

Do not move a component to global folders prematurely.

Keep page-specific code close to the page.

When a component becomes genuinely reusable, promote it to the
appropriate shared folder.

------------------------------------------------------------------------

# 39. Dependency Direction

Keep dependencies flowing toward reusable layers.

Preferred:

``` text
Page
 ↓
Partials
 ↓
Page Components
 ↓
Domain Components
 ↓
Common Components
 ↓
UI Components
```

Avoid making global UI components depend on page-specific components.

For example:

``` text
components/ui
```

must never import:

``` text
app/movie/[id]/_components/*
```

Global components should remain independent.

------------------------------------------------------------------------

# 40. Data Flow Summary

## Server-side data flow

``` text
Next.js Server Component
        ↓
TMDB server function / Axios
        ↓
TMDB API
        ↓
Mapper
        ↓
Server Component
```

## Client-side data flow

``` text
Client Component
        ↓
Custom Hook
        ↓
TanStack Query
        ↓
services/api/*
        ↓
Axios
        ↓
Next.js /api/*
        ↓
TMDB Axios Instance
        ↓
TMDB API
```

The client must never bypass the internal API layer for TMDB data.

------------------------------------------------------------------------

# 41. Code Quality Rules

Prefer:

-   Small focused components
-   Explicit types
-   Clear names
-   Early returns where useful
-   Minimal effects
-   Reusable utilities
-   Semantic HTML
-   Predictable data flow

Avoid:

-   Giant components
-   Deeply nested conditionals
-   Duplicate API logic
-   Duplicate query keys
-   Duplicate design values
-   Unnecessary abstractions
-   Unused props
-   Unused imports
-   `any` unless genuinely unavoidable
-   `@ts-ignore` without a documented reason

Do not silence TypeScript or ESLint errors merely to make the build
pass.

Fix the underlying problem.

------------------------------------------------------------------------

# 42. Naming Conventions

Use:

-   `kebab-case` for filenames
-   `PascalCase` for React components
-   `camelCase` for variables/functions
-   `UPPER_SNAKE_CASE` only for true constants when appropriate

Examples:

``` text
movie-card.tsx
movie-hero.tsx
use-movie-detail.ts
query-provider.tsx
```

Components:

``` tsx
MovieCard
MovieHero
MovieRating
```

Hooks:

``` tsx
useMovieDetail
usePopularMovies
```

------------------------------------------------------------------------

# 43. Do Not Add Features Without Product Value

The website currently does not need:

-   Authentication
-   User accounts
-   Reviews
-   Social feeds
-   Chat
-   Admin dashboard
-   Complex personalization
-   Payment
-   Database-backed profiles

Do not add these unless explicitly requested.

Potential future features may include:

-   Watchlist
-   Favorites
-   Better discovery filters
-   Genre pages
-   Movie collections
-   Trailer browsing

But they should not be implemented speculatively.

------------------------------------------------------------------------

# 44. TMDB Attribution

The project uses the TMDB API.

Follow TMDB's current attribution and usage requirements.

Include the appropriate TMDB attribution in the application as required
by their API terms.

Do not claim the website is endorsed or certified by TMDB.

Do not remove required attribution.

------------------------------------------------------------------------

# 45. AI Agent Workflow

When starting work on this repository:

1. Read `AGENTS.md` completely before making architectural decisions.
2. Inspect the existing repository structure.
3. Inspect `package.json` to understand installed dependencies and scripts.
4. Inspect `.env.example` before implementing any environment-dependent feature.
5. Treat `.env.example` as the source of truth for environment variable names.
6. Reuse existing project conventions, components, utilities, API services, and hooks before creating new ones.
7. Do not initialize a second Next.js project if the repository has already been initialized.
8. Do not replace the existing stack with another framework, UI library, icon library, data-fetching library, or styling approach.
9. Do not introduce new dependencies unless they solve a real requirement.
10. Implement the smallest clean solution that follows this document.
11. After implementation, verify TypeScript, linting, and relevant application behavior.

### Environment Variable Rule

Never assume environment variable names from TMDB documentation, tutorials, examples, or personal preference.

Always inspect `.env.example` first.

For this project:

```env
MOVIE_TOKEN=""
MOVIE_BASE_URL=""
```

Use these exact names.

Do not create replacements such as:

```env
TMDB_ACCESS_TOKEN=""
TMDB_API_KEY=""
TMDB_BASE_URL=""
NEXT_PUBLIC_MOVIE_TOKEN=""
```

Do not expose `MOVIE_TOKEN` to the browser.

### Before Coding a New Feature

Determine:

```text
Does an existing component solve this?
        ↓
Does an existing utility solve this?
        ↓
Does an existing API service solve this?
        ↓
Does an existing query/hook solve this?
        ↓
Only then create something new.
```

Avoid duplicate implementations.

### Before Adding a New TMDB Endpoint

Determine:

```text
Is there a real user-facing feature that needs this endpoint?
        ↓
Is an existing internal API endpoint sufficient?
        ↓
Can the existing TMDB server layer support it cleanly?
        ↓
Only then add the endpoint.
```

Do not implement TMDB endpoints simply because they exist in the documentation.

### Existing Project Rule

If the user has already initialized the Next.js project, continue from the existing project.

Do not:

- run `create-next-app` again
- replace the existing `package.json`
- replace the existing Tailwind configuration
- replace the existing Next.js configuration
- recreate the project structure unnecessarily

First inspect what already exists, then make incremental changes.

--------------------

# 46. Final Design Checklist

Before considering a page complete, verify:

-   [ ] Works in light mode.
-   [ ] Works in dark mode.
-   [ ] Respects system theme.
-   [ ] No arbitrary color values.
-   [ ] No unnecessary arbitrary Tailwind values.
-   [ ] Uses semantic CSS variables.
-   [ ] Uses Iconify instead of Lucide.
-   [ ] Icons have consistent visual style.
-   [ ] Uses shadcn/ui where appropriate.
-   [ ] Movie artwork is visually prioritized.
-   [ ] Typography has clear hierarchy.
-   [ ] Borders are intentional.
-   [ ] Shadows are intentional.
-   [ ] Rounded corners are restrained.
-   [ ] Animations are purposeful.
-   [ ] No glassmorphism.
-   [ ] No generic SaaS styling.
-   [ ] No unnecessary decorative elements.
-   [ ] No obvious AI-slop patterns.
-   [ ] Mobile layout is intentionally designed.
-   [ ] Keyboard interaction works.
-   [ ] Images have meaningful alt text.
-   [ ] Loading states exist.
-   [ ] Error states exist.
-   [ ] Empty states exist where relevant.
-   [ ] Metadata is meaningful.
-   [ ] TMDB credentials remain server-only.
-   [ ] Client communicates through `/api/*`.
-   [ ] Client fetching uses TanStack Query.
-   [ ] Backend TMDB requests use Axios.
-   [ ] Components are placed according to ownership rules.

------------------------------------------------------------------------

# 47. Golden Rule

When there is a choice between adding more UI and keeping the interface
focused:

> **Choose clarity.**

When there is a choice between a clever abstraction and a simple
implementation:

> **Choose the simple implementation.**

When there is a choice between following a generic AI design pattern and
creating an intentional editorial composition:

> **Choose the intentional composition.**

When there is a choice between putting logic in the client and keeping
it server-side:

> **Keep it server-side when possible.**

The final product should feel like a carefully art-directed movie
discovery product built by a frontend developer --- **not a collection
of AI-generated UI patterns.**
