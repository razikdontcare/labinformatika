"use server";
import { clientConfig, serverConfig } from "@/config";
import { auth } from "@/lib/firebase";
import { Project, ProjectData } from "@/type";
import { signInWithCustomToken } from "firebase/auth";
import { getTokens, getFirebaseAuth } from "next-firebase-auth-edge";
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

export async function authAction() {
  return getFirebaseAuth({
    apiKey: clientConfig.apiKey,
    serviceAccount: serverConfig.serviceAccount,
  });
}

export async function loginAction(
  username: string,
  password: string,
  redirectTo?: string,
) {
  const response = await fetch(process.env.API_URL + "/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    console.error("Login failed", response);
    return;
  }
  const { token, email } = await response.json();
  const userCredentials = await signInWithCustomToken(auth, token);

  if (userCredentials.user.email === null) {
    const { updateUser, setCustomUserClaims } = await authAction();
    const tokenResult = await userCredentials.user.getIdTokenResult();

    await setCustomUserClaims(userCredentials.user.uid, {
      role: tokenResult.claims.role,
      username: tokenResult.claims.username,
    });

    await updateUser(userCredentials.user.uid, {
      displayName: tokenResult.claims.username as string,
      email: email,
      emailVerified: email.includes("unud.ac.id") ? true : false,
    });
  }

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
  redirect(redirectTo ?? "/dashboard");
}

export async function getProjects(): Promise<Project[] | undefined> {
  const token = await getTokens(await cookies(), {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  });

  if (!token) throw new Error("Unauthorized");

  const response = await fetch(process.env.API_URL + "/project/list", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    console.error("Failed to fetch projects", response);
    return;
  }

  return response.json();
}

export async function deleteProject(id: string): Promise<boolean> {
  const token = await getTokens(await cookies(), {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  });

  if (!token) return false;

  const response = await fetch(process.env.API_URL + "/project/delete/" + id, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    console.error("Failed to delete project", response);
    return false;
  }

  return true;
}

export async function updateProject(
  id: string,
  data: Partial<ProjectData>,
): Promise<boolean> {
  const token = await getTokens(await cookies(), {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  });

  if (!token) return false;

  const response = await fetch(process.env.API_URL + "/project/update/" + id, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    console.error("Failed to update project", response);
    return false;
  }

  return true;
}

export async function addProject(data: ProjectData): Promise<boolean> {
  const token = await getTokens(await cookies(), {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  });

  if (!token) return false;

  const response = await fetch(process.env.API_URL + "/project/add", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    console.error("Failed to add project", response);
    return false;
  }

  return true;
}
