import { initializeApp, getApps, App, getApp, cert } from "firebase-admin/app";

import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

import serviceKey from "./service_key.json";

let app: App;

if (getApps().length === 0) {
  app = initializeApp({
    // @ts-expect-error: firebase admin servicekey
    credential: cert(serviceKey),
  });
} else {
  app = getApp();
}

const adminDb = getFirestore(app);
const adminStorage = getStorage(app);

export { app as adminApp, adminDb, adminStorage };
