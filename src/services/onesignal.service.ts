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

export function isOneSignalInitialized(): boolean {
  return initialized;
}

export async function promptPush(): Promise<void> {
  if (!initialized) await initOneSignal();
  await OneSignal.Slidedown.promptPush({ force: true });
}
