# PageSpeed Optimization Documentation

**Date:** February 2026
**Goal:** Achieve 95+ scores across all four PageSpeed Insights categories (Performance, Accessibility, Best Practices, SEO) on both mobile and desktop.

**Before:** Performance ~60 | Accessibility 90 | Best Practices 96 | SEO 92

---

## Changes Made

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

### 3. Performance (60 → 95+)

#### 3a. Image Optimization

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

The `Hero.tsx` decorative ring also had a static `opacity-20` class removed so the animation's opacity values take full effect.

#### 3d. Code Splitting

Lazy-loaded the `NotFound` page using `React.lazy` and `Suspense` in `src/AppRoutes.tsx`. This splits it into a separate chunk (~2KB) that only loads on 404 routes, reducing the initial JS bundle size.

### 4. Best Practices (96 → 95+)

Created `public/_headers` for Cloudflare Pages with the following security headers:

| Header | Value | Purpose |
|--------|-------|---------|
| `X-Content-Type-Options` | `nosniff` | Prevents MIME-type sniffing |
| `X-Frame-Options` | `DENY` | Prevents clickjacking |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Controls referrer information |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | Restricts browser APIs |
| `Cross-Origin-Opener-Policy` | `same-origin` | Isolates browsing context |
| `Content-Security-Policy` | (see file) | Restricts resource loading origins |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains; preload` | Enforces HTTPS |

---

## Files Modified

| File | Type |
|------|------|
| `public/robots.txt` | Modified |
| `public/sitemap.xml` | New |
| `public/_headers` | New |
| `index.html` | Modified |
| `src/AppRoutes.tsx` | Modified |
| `src/components/Navigation.tsx` | Modified |
| `src/components/Footer.tsx` | Modified |
| `src/components/Hero.tsx` | Modified |
| `src/components/About.tsx` | Modified |
| `src/components/Projects.tsx` | Modified |
| `tailwind.config.ts` | Modified |

---

## Verification

1. **Build:** `npm run build` passes with no errors or warnings
2. **Preview:** `npm run preview` to check site works locally
3. **Deploy:** Push to Cloudflare Pages and run PageSpeed Insights on both mobile and desktop
