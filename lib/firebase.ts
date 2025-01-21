import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { clientConfig } from "@/config";

const app = initializeApp(clientConfig);

export const auth = getAuth(app);
