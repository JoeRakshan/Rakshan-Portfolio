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
      await reconcileSubscriptionState();
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

export function getSubscriptionId(): string | null {
  if (!initialized) return null;
  return OneSignal.User?.PushSubscription?.id ?? null;
}

export function isOptedIn(): boolean {
  if (!initialized) return false;
  return OneSignal.User?.PushSubscription?.optedIn === true;
}

export async function optOut(): Promise<void> {
  if (!initialized) await initOneSignal();
  await OneSignal.User.PushSubscription.optOut();
}

export async function optIn(): Promise<void> {
  if (!initialized) await initOneSignal();
  await OneSignal.User.PushSubscription.optIn();
}

/**
 * Hard reset: tear down browser push state + OneSignal SDK state, then
 * re-init from zero. Use when the OneSignal record was deleted from the
 * dashboard or the subscription_id in the dashboard no longer delivers
 * (orphaned FCM endpoint).
 */
export async function forceResubscribe(): Promise<string | null> {
  try {
    if (initialized) {
      try {
        await OneSignal.User.PushSubscription.optOut();
      } catch (err) {
        console.warn("[OneSignal] optOut during reset failed", err);
      }
    }

    if ("serviceWorker" in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(
        registrations
          .filter((r) => r.active?.scriptURL?.includes("OneSignalSDKWorker"))
          .map((r) => r.unregister())
      );
    }

    initialized = false;
    initPromise = null;

    await initOneSignal();
    await OneSignal.User.PushSubscription.optIn();

    return getSubscriptionId();
  } catch (err) {
    console.error("[OneSignal] forceResubscribe failed", err);
    return null;
  }
}

/**
 * Detects orphaned state — browser thinks it's subscribed but the
 * subscription_id is missing/dead on OneSignal. If we boot up with
 * `optedIn === true` but no `id`, the SDK lost its binding; auto-recover.
 */
async function reconcileSubscriptionState(): Promise<void> {
  const optedIn = OneSignal.User?.PushSubscription?.optedIn;
  const id = OneSignal.User?.PushSubscription?.id;

  if (optedIn === true && !id) {
    console.warn("[OneSignal] orphaned subscription detected — resubscribing");
    try {
      await OneSignal.User.PushSubscription.optOut();
      await OneSignal.User.PushSubscription.optIn();
    } catch (err) {
      console.error("[OneSignal] auto-recover failed", err);
    }
  }
}
