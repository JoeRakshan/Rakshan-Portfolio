# OneSignal Web Push — Setup Summary

**Date:** 2026-04-20
**Project:** Rakshan Portfolio (`glow-sparkle-show-main`)
**Production URL:** https://joeselvarakshan.site
**Repo:** https://github.com/JoeRakshan/Rakshan-Portfolio

---

## Goal

Enable web push notifications on the portfolio site so the owner can send announcements (new projects, blog posts, etc.) directly from the OneSignal dashboard — no backend required.

---

## Architectural Choices

| Aspect | Choice | Why |
|---|---|---|
| Sending mechanism | **OneSignal Dashboard only** (Plan A) | No backend exists; manual sends suffice |
| REST API key | **Not used** | Only needed for programmatic sends |
| App ID storage | **Hardcoded in source** | Public by design; avoids Cloudflare env var setup |
| Prompt trigger | **Programmatic** `Slidedown.promptPush({ force: true })` | v16 SDK doesn't auto-prompt on init |
| User identity | **Anonymous** (no `OneSignal.login()`) | Single-user site; no auth |
| Hosting | Cloudflare Pages, auto-deploy from `main` | Existing setup |

---

## OneSignal App Config

- **App ID:** `0c40b82e-e151-4390-a9e8-aab6001ac933`
- **Site URL:** `https://joeselvarakshan.site`
- **Platform:** Web Push → Typical Site (HTTPS)
- **Safari Web ID:** not configured
- **Permission Prompt:** Auto-prompt enabled in dashboard (+ forced via code as fallback)

---

## Files in This Integration

### Created
| File | Purpose |
|---|---|
| `public/OneSignalSDKWorker.js` | Service worker (imports OneSignal CDN worker) |
| `src/services/onesignal.service.ts` | SDK init + slidedown trigger |

### Modified
| File | Change |
|---|---|
| `package.json` / `package-lock.json` | Added `react-onesignal@^3.5.1` |
| `src/App.tsx` | Added `useEffect(() => initOneSignal(), [])` |
| `public/_headers` | Extended CSP for OneSignal domains + service worker |

### Deleted
- `OneSignalSDK-v16-ServiceWorker/` — SW was here originally, moved to `public/`
- `__MACOSX/` — macOS zip metadata junk

---

## Key Code

### `src/services/onesignal.service.ts`
```typescript
import OneSignal from "react-onesignal";

const ONESIGNAL_APP_ID = "0c40b82e-e151-4390-a9e8-aab6001ac933";

let initialized = false;
let initPromise: Promise<void> | null = null;

export async function initOneSignal(): Promise<void> {
  if (initialized) return;
  if (initPromise) return initPromise;

  initPromise = OneSignal.init({
    appId: ONESIGNAL_APP_ID,
    allowLocalhostAsSecureOrigin: import.meta.env.DEV,
    serviceWorkerPath: "OneSignalSDKWorker.js",
  })
    .then(async () => {
      initialized = true;
      try {
        await OneSignal.Slidedown.promptPush({ force: true });
      } catch (err) {
        console.warn("[OneSignal] slidedown prompt failed", err);
      }
    })
    .catch((err) => {
      console.error("[OneSignal] init failed", err);
      initPromise = null;
    });

  return initPromise;
}

export function isOneSignalInitialized(): boolean {
  return initialized;
}

export async function promptPush(): Promise<void> {
  if (!initialized) await initOneSignal();
  await OneSignal.Slidedown.promptPush({ force: true });
}
```

### `public/OneSignalSDKWorker.js`
```js
importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");
```

### `src/App.tsx` (relevant bits)
```typescript
import { useEffect } from "react";
import { initOneSignal } from "@/services/onesignal.service";

const App = () => {
  useEffect(() => {
    initOneSignal();
  }, []);
  // ... providers + routes
};
```

### `public/_headers` CSP
```
Content-Security-Policy: default-src 'self';
  script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com https://cdn.onesignal.com https://*.onesignal.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' https://images.unsplash.com https://*.onesignal.com data:;
  font-src 'self';
  connect-src 'self' https://cloudflareinsights.com https://onesignal.com https://*.onesignal.com wss://*.onesignal.com;
  worker-src 'self' blob:;
  frame-ancestors 'none'
```

---

## Commit History

| Hash | Message |
|---|---|
| `658d1e7` | add OneSignal web push integration |
| `b783459` | hardcode OneSignal app_id in service, drop env var dependency |
| `10f284f` | force show OneSignal slidedown after init to drive subscriptions |

---

## How to Send a Push (Day-to-Day Use)

1. Log in to OneSignal Dashboard
2. **Messages → New Push**
3. Fill Title + Message
4. (Optional) Launch URL — defaults to Site URL if blank
5. Audience: **Total Subscriptions**
6. **Send**

---

## How a Subscription Gets Created (User Flow)

```
Visitor opens https://joeselvarakshan.site
     ↓
App.tsx mounts → useEffect fires
     ↓
initOneSignal() runs
     ↓
OneSignal SDK loads (from cdn.onesignal.com)
     ↓
Service worker registers at /OneSignalSDKWorker.js
     ↓
Slidedown prompt appears ("Subscribe to notifications?")
     ↓
User clicks "Continue" → browser's native prompt appears
     ↓
User clicks "Allow"
     ↓
OneSignal assigns a player_id → stored in OneSignal cloud
     ↓
OneSignal Audience count goes up by 1
     ↓
Any future "New Push" from dashboard → reaches this user,
even with the site closed
```

---

## Troubleshooting

### "0 estimated recipients" when sending
- Someone needs to visit the site and click **Allow** first
- Check OneSignal Dashboard → Audience → Subscriptions for the count

### Slidedown doesn't appear
- Cloudflare deploy not finished → check Deployments tab
- Hard refresh (Ctrl+Shift+R) — browser cached old JS
- Incognito window (cleanest test)
- Previously dismissed → Chrome → 🔒 icon → Notifications → Ask (default)
- F12 → Console → check `window.OneSignal` (undefined = SDK never loaded)

### Site URL mismatch
- OneSignal Dashboard Site URL must exactly match the address bar
- `joeselvarakshan.site` vs `www.joeselvarakshan.site` must be consistent

### Push click does nothing
- Set Launch URL in OneSignal dashboard per-message, or
- Default URL in Web Push platform settings

---

## Known Limitations

- **Safari iOS < 16.4** — no web push support; user must use an iOS 16.4+ device, and install site as PWA
- **Safari macOS** — requires Apple Push Certificate + Safari Web ID (not set up yet)
- **Free tier cap** — 10,000 subscribers max on OneSignal free plan
- **Permission is sticky** — if a visitor clicked Block, we cannot re-prompt; they must reset manually in browser site settings
- **No delivery receipt** — OneSignal confirms "accepted by push service", not "shown to user"

---

## Future Ideas (Not Yet Implemented)

- Manual "Subscribe" button in Hero/Footer — fallback if auto-slidedown gets dismissed
- Cloudflare Worker for programmatic sends (would require `rest_api_key`)
- Category-based subscriptions (projects vs. blog vs. work updates)
- Safari macOS support (Apple Push Certificate setup)
- PWA manifest → enables iOS 16.4+ push after "Add to Home Screen"

---

*Last Updated: 2026-04-20*
