"use server";
import { clientConfig, serverConfig } from "@/config";
import { auth } from "@/lib/firebase";
import { signInWithCustomToken } from "firebase/auth";
import { getTokens } from "next-firebase-auth-edge";
import {
  refreshServerCookies,
  refreshCookiesWithIdToken,
} from "next-firebase-auth-edge/lib/next/cookies";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export async function refreshCreds() {
  const token = await getTokens(await cookies(), {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  });

  if (!token) throw new Error("Unauthorized");

  await refreshServerCookies(await cookies(), new Headers(await headers()), {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    cookieSerializeOptions: serverConfig.cookieSerializeOptions,
    serviceAccount: serverConfig.serviceAccount,
  });
}

export async function loginAction(username: string, password: string) {
  const response = await fetch(process.env.API_URL + "/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    console.error("Login failed", response);
    return;
  }
  const { token } = await response.json();
  const userCredentials = await signInWithCustomToken(auth, token);
  const idToken = await userCredentials.user.getIdToken();

  await refreshCookiesWithIdToken(
    idToken,
    new Headers(await headers()),
    await cookies(),
    {
      apiKey: clientConfig.apiKey,
      cookieName: serverConfig.cookieName,
      cookieSignatureKeys: serverConfig.cookieSignatureKeys,
      cookieSerializeOptions: serverConfig.cookieSerializeOptions,
      enableCustomToken: true,
      enableMultipleCookies: true,
      serviceAccount: serverConfig.serviceAccount,
    },
  );
  redirect("/dashboard");
}
