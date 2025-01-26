import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { clientConfig } from "@/config";

const app = initializeApp(clientConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
