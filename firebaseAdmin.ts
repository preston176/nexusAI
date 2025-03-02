import { initializeApp, getApps, App, getApp, cert } from "firebase-admin/app";

import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

const rawJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON?.trim();
const serviceKeyJson = JSON.parse(Buffer.from(rawJson!, "base64").toString("utf-8"));
// const serviceKeyJson = JSON.parse(Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_JSON!, 'base64').toString('utf-8'));

let app: App;

if (getApps().length === 0) {
  app = initializeApp({
    credential: cert(serviceKeyJson),
  });
} else {
  app = getApp();
}

const adminDb = getFirestore(app);
const adminStorage = getStorage(app);

export { app as adminApp, adminDb, adminStorage };
