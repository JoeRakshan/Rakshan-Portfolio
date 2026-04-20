import OneSignal from "react-onesignal";

let initialized = false;
let initPromise: Promise<void> | null = null;

export async function initOneSignal(): Promise<void> {
  if (initialized) return;
  if (initPromise) return initPromise;

  const appId = import.meta.env.VITE_ONESIGNAL_APP_ID;
  if (!appId || appId === "PASTE_YOUR_ONESIGNAL_APP_ID_HERE") {
    console.warn("[OneSignal] VITE_ONESIGNAL_APP_ID is not set — skipping init");
    return;
  }

  initPromise = OneSignal.init({
    appId,
    allowLocalhostAsSecureOrigin: import.meta.env.DEV,
    serviceWorkerPath: "OneSignalSDKWorker.js",
    notifyButton: { enable: false },
  })
    .then(() => {
      initialized = true;
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
