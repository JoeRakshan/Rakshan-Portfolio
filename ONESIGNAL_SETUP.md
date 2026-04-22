# OneSignal Web Push — Setup Summary

**Project:** Rakshan Portfolio (`glow-sparkle-show-main`)
**Production URL:** https://joeselvarakshan.site

---

## App Config

- **App ID:** `0c40b82e-e151-4390-a9e8-aab6001ac933`
- **Site URL:** `https://joeselvarakshan.site`
- **Platform:** Web Push → Typical Site (HTTPS)
- **Sending mechanism:** OneSignal Dashboard (no backend)

---

## Files

| File | Purpose |
|---|---|
| `public/OneSignalSDKWorker.js` | Service worker (imports OneSignal CDN worker) |
| `src/services/onesignal.service.ts` | SDK init + slidedown trigger |
| `src/App.tsx` | `useEffect(() => initOneSignal(), [])` |
| `public/_headers` | CSP allowing OneSignal script, style, img, connect |
| `package.json` | `react-onesignal@^3.5.1` dependency |

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
    serviceWorkerPath: "/OneSignalSDKWorker.js",
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
```

### `public/OneSignalSDKWorker.js`
```js
importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");
```

### `public/_headers` — CSP
```
Content-Security-Policy: default-src 'self';
  script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com https://cdn.onesignal.com https://*.onesignal.com;
  style-src 'self' 'unsafe-inline' https://cdn.onesignal.com https://onesignal.com https://*.onesignal.com;
  img-src 'self' https://images.unsplash.com https://*.onesignal.com data:;
  font-src 'self';
  connect-src 'self' https://cloudflareinsights.com https://onesignal.com https://*.onesignal.com wss://*.onesignal.com;
  worker-src 'self' blob:;
  frame-ancestors 'none'
```

---

## How to Send a Push

1. Log in to OneSignal Dashboard
2. **Messages → New Push**
3. Fill Title + Message (+ optional Launch URL)
4. Audience: **Total Subscriptions**
5. **Send**

---

## Platform Support

| Platform | Works? |
|---|---|
| Chrome / Edge / Firefox (desktop + Android) | ✅ |
| Safari macOS | ❌ Needs Apple Push Certificate + Safari Web ID |
| Safari iOS | ❌ Needs PWA install (manifest not yet added) |
