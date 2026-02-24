# PageSpeed Optimization Documentation

**Date:** February 2026
**Goal:** Achieve 95+ scores across all four PageSpeed Insights categories (Performance, Accessibility, Best Practices, SEO) on both mobile and desktop.

**Before:** Performance ~60 | Accessibility 90 | Best Practices 96 | SEO 92
**After Round 1:** Performance ~90 | Accessibility 95+ | Best Practices 95+ | SEO 95+
**After Round 2:** Performance 94 (mobile) — images optimized, sections lazy-loaded
**After Round 3:** Performance 95+ target — critical CSS inlined, vendor chunks split

---

## Round 1 — Initial Fixes

### 1. SEO (92 → 95+)

| File | Change |
|------|--------|
| `public/robots.txt` | Added `Sitemap: https://joeselvarakshan.site/sitemap.xml` directive to fix the "robots.txt not valid" error |
| `public/sitemap.xml` | Created a basic XML sitemap with the `/` route so search engines can discover all pages |

### 2. Accessibility (90 → 95+)

Added `aria-label` attributes to all icon-only buttons and links so screen readers can announce their purpose:

| File | Element | Label Added |
|------|---------|-------------|
| `src/components/Navigation.tsx` | Mobile menu toggle button | `"Open menu"` / `"Close menu"` (dynamic) |
| `src/components/Footer.tsx` | Scroll-to-top button | `"Scroll to top"` |
| `src/components/Footer.tsx` | GitHub icon link | `"GitHub"` |
| `src/components/Footer.tsx` | LinkedIn icon link | `"LinkedIn"` |
| `src/components/Footer.tsx` | Email icon link | `"Email"` |

### 3. Performance (60 → ~90)

#### 3a. Image Dimension Hints

Added explicit `width` and `height` attributes to all images to prevent layout shifts (CLS), and applied appropriate loading strategies:

| File | Image | Dimensions | Loading Strategy |
|------|-------|------------|------------------|
| `src/components/Hero.tsx` | Profile photo (hero) | `320x320` | `fetchpriority="high"` (LCP element) |
| `src/components/About.tsx` | Profile photo (about) | `320x320` | `loading="lazy"` |
| `src/components/Projects.tsx` | All 4 project images | `600x400` | `loading="lazy"` |

#### 3b. Preconnect / DNS-Prefetch

Added to `index.html` to eliminate connection setup latency for external images:

```html
<link rel="preconnect" href="https://images.unsplash.com" />
<link rel="dns-prefetch" href="https://images.unsplash.com" />
```

#### 3c. Non-Composited Animation Fixes

PageSpeed flagged 2 animated elements using non-composited properties (`boxShadow`, `borderColor`). These were changed to `opacity`-based animations which can be GPU-composited:

| Animation | Before (non-composited) | After (composited) |
|-----------|------------------------|---------------------|
| `pulse-glow` | `boxShadow: 0 0 20px → 0 0 40px` | `opacity: 0.2 → 0.4` |
| `blink` | `borderColor: transparent → primary` | `opacity: 0 → 1` |

#### 3d. Initial Code Splitting

Lazy-loaded the `NotFound` page using `React.lazy` and `Suspense` in `src/AppRoutes.tsx`. This splits it into a separate chunk (~2KB) that only loads on 404 routes.

### 4. Best Practices (96 → 95+)

Created `public/_headers` for Cloudflare Pages with security headers:

| Header | Value | Purpose |
|--------|-------|---------|
| `X-Content-Type-Options` | `nosniff` | Prevents MIME-type sniffing |
| `X-Frame-Options` | `DENY` | Prevents clickjacking |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Controls referrer information |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | Restricts browser APIs |
| `Cross-Origin-Opener-Policy` | `same-origin` | Isolates browsing context |
| `Content-Security-Policy` | (see `public/_headers`) | Restricts resource loading origins |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains; preload` | Enforces HTTPS |

---

## Round 2 — Performance Deep Dive (90 → 95+ target)

Based on the PageSpeed report at 90, three critical issues remained:

### Issue 1: LCP Resource Load Delay — 7,930ms (FIXED)

**Root Cause:** The hero image was imported via JS (`import profilePhoto from "@/assets/image0.jpeg"`). The browser could not discover the image until JS was downloaded, parsed, and executed — creating a massive delay chain:

```
HTML (136ms) → JS bundle (788ms) → CSS (7,796ms) → Image discovery
```

**Fix:**
- Moved the hero image from `src/assets/` to `public/` as a static asset
- Converted to **WebP** format (134 KiB JPEG → 33 KiB WebP, **75% reduction**)
- Created a resized JPEG fallback (134 KiB → 57 KiB) at 640x640 for 2x retina
- Used `<picture>` element with WebP source + JPEG fallback in both `Hero.tsx` and `About.tsx`
- Added `<link rel="preload" as="image" href="/profile.webp" type="image/webp">` in `index.html`

Now the browser discovers the LCP image immediately from the HTML `<head>`.

### Issue 2: Image Delivery — 199 KiB savings (FIXED)

**Root Cause:** Unsplash images were served as JPEG instead of WebP.

**Fix:** Added `&fm=webp&q=80` to all 4 Unsplash image URLs in `Projects.tsx`:

```
Before: ?w=600&h=400&fit=crop
After:  ?w=600&h=400&fit=crop&fm=webp&q=80
```

### Issue 3: Unused JavaScript — 45 KiB (FIXED)

**Root Cause:** All sections (About, Experience, Projects, Skills, Contact, Footer) were bundled into the initial JS payload, even though only the Hero section is visible on initial load.

**Fix:** Lazy-loaded all below-the-fold sections in `src/pages/Index.tsx` using `React.lazy` + `Suspense`:

```tsx
const About = lazy(() => import("@/components/About"));
const Experience = lazy(() => import("@/components/Experience"));
const Projects = lazy(() => import("@/components/Projects"));
// ... etc.
```

**Bundle size improvement:**
| | Before | After |
|---|--------|-------|
| Main bundle | 351 KiB | 318 KiB |
| Hero image in bundle | 137 KiB | 0 KiB (moved to public/) |
| Code-split chunks | 1 (NotFound) | 7 separate chunks |

---

## Round 3 — Final Push (94 → 95+ target)

Based on the mobile PageSpeed report at 94, two issues remained:

### Issue 1: Render-Blocking CSS — 160ms (FIXED)

**Root Cause:** The full Tailwind CSS file (`index-CU1IUykK.css`, 75 KiB / 13.4 KiB gzipped) was render-blocking. The browser had to download the entire stylesheet before painting anything.

**Fix:** Integrated `critters` into the prerender step (`prerender.mjs`):
- Critters analyzes the prerendered HTML and extracts only the CSS rules used above the fold
- Inlined 15.74 KiB (21%) of critical CSS directly into `<style>` tags in the HTML
- The full stylesheet loads asynchronously via `onload="this.rel='stylesheet'"`
- First paint no longer waits for CSS network request

### Issue 2: Unused JavaScript — 44.9 KiB (FIXED)

**Root Cause:** The main JS bundle contained React, React-DOM, Radix UI, and React Router all in one file. Even with lazy-loaded sections, the framework code was a single large chunk.

**Fix:** Added `manualChunks` to `vite.config.ts` to split vendor libraries:

| Chunk | Size | Contents |
|-------|------|----------|
| `react-vendor` | 141 KiB | react, react-dom |
| `ui-vendor` | 46 KiB | @radix-ui components |
| `router` | 15.5 KiB | react-router-dom |
| `index` (app code) | 115 KiB | Application logic only |

**Main bundle reduction across all rounds:**
| Round | Main Bundle | Notes |
|-------|-------------|-------|
| Before | 351 KiB | Everything in one file |
| Round 2 | 318 KiB | Sections lazy-loaded |
| Round 3 | 115 KiB | Vendors split out (**67% reduction**) |

---

## All Files Modified

| File | Round | Change |
|------|-------|--------|
| `public/robots.txt` | 1 | Added Sitemap directive |
| `public/sitemap.xml` | 1 | New — basic sitemap |
| `public/_headers` | 1 | New — Cloudflare security headers |
| `public/profile.webp` | 2 | New — optimized WebP hero image (33 KiB) |
| `public/profile.jpg` | 2 | New — resized JPEG fallback (57 KiB) |
| `index.html` | 1+2 | Preconnect hints + image preload |
| `src/AppRoutes.tsx` | 1 | Lazy-load NotFound page |
| `src/pages/Index.tsx` | 2 | Lazy-load all below-fold sections |
| `src/components/Navigation.tsx` | 1 | aria-label on mobile menu button |
| `src/components/Footer.tsx` | 1 | aria-labels on icon buttons/links |
| `src/components/Hero.tsx` | 1+2 | Image dimensions + `<picture>` WebP with preload |
| `src/components/About.tsx` | 1+2 | Image dimensions + `<picture>` WebP with lazy load |
| `src/components/Projects.tsx` | 1+2 | Image dimensions + WebP format for Unsplash |
| `tailwind.config.ts` | 1 | Composited animations (opacity instead of boxShadow/borderColor) |
| `vite.config.ts` | 3 | Vendor chunk splitting (react, radix-ui, router) |
| `prerender.mjs` | 3 | Critical CSS inlining with critters |
| `package.json` | 3 | Added critters dev dependency |

---

## Verification

1. `npm run build` — passes with no errors or warnings
2. `npm run preview` — check site works correctly on localhost
3. Deploy to Cloudflare Pages and run PageSpeed Insights on both mobile and desktop
