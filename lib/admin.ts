import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { serverConfig } from "@/config";

const app = initializeApp({
  credential: cert(serverConfig.serviceAccount),
});

export const db = getFirestore(app);
export const auth = getAuth(app);
