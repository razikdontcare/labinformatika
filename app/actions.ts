"use server";
import { clientConfig, serverConfig } from "@/config";
import { auth } from "@/lib/firebase";
import { Creator, Project, ProjectData, UserDetail } from "@/type";
import { signInWithCustomToken } from "firebase/auth";
import { getTokens, getFirebaseAuth } from "next-firebase-auth-edge";
import {
  refreshServerCookies,
  refreshCookiesWithIdToken,
} from "next-firebase-auth-edge/lib/next/cookies";
import { revalidatePath } from "next/cache";
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
  const response = await fetch(process.env.BASE_URL + "/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    console.error("Login failed", response);
    return;
  }
  const { token, email, emailVerified } = await response.json();
  const userCredentials = await signInWithCustomToken(auth, token);

  const { updateUser, setCustomUserClaims } = await authAction();
  const tokenResult = await userCredentials.user.getIdTokenResult();

  await setCustomUserClaims(userCredentials.user.uid, {
    role: tokenResult.claims.role,
    username: tokenResult.claims.username,
  });

  await updateUser(userCredentials.user.uid, {
    displayName: tokenResult.claims.username as string,
    email: email,
    emailVerified: emailVerified as boolean,
  });

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
  const response = await fetch(process.env.API_URL + "/project/list", {
    method: "GET",
  });

  if (!response.ok) {
    console.error("Failed to fetch projects", response);
    return;
  }

  return response.json();
}

export async function getProjectById(id: string): Promise<Project> {
  const token = await getTokens(await cookies(), {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  });

  if (!token) throw new Error("Unauthorized");

  const response = await fetch(process.env.API_URL + "/project/get/" + id, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    console.error("Failed to fetch project", response);
    throw new Error("Failed to fetch project");
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

  revalidatePath("/dashboard/manage");
  revalidatePath("/showcase");
  return true;
}

export async function updateProject(
  id: string,
  formData: FormData,
  creators: Creator[],
): Promise<boolean> {
  const token = await getTokens(await cookies(), {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  });

  if (!token) return false;

  const data = Object.fromEntries(formData.entries());
  const projectData: Partial<ProjectData> = {
    name: data.name as string,
    description: data.description as string,
    creators: creators,
    projectUrl: data.projectUrl as string,
  };

  const file = data.picture as File;

  if (file && file.size > 0) {
    const fileForm = new FormData();
    fileForm.append("file", file);
    fileForm.append("filename", id);

    const imgupload = await fetch(
      process.env.API_URL + "/project/upload-image",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
        body: fileForm,
      },
    );

    if (!imgupload.ok) {
      console.error("Failed to upload image", imgupload);
      return false;
    }

    const { url, fileId } = await imgupload.json();
    projectData.picture = {
      url,
      id: fileId,
    };
  }

  const response = await fetch(process.env.API_URL + "/project/update/" + id, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(projectData),
  });

  if (!response.ok) {
    console.error("Failed to update project", response);
    return false;
  }

  revalidatePath("/dashboard/manage");
  revalidatePath("/showcase");
  return true;
}

export async function addProject(
  formData: FormData,
  creators: Creator[],
): Promise<boolean> {
  const token = await getTokens(await cookies(), {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  });

  if (!token) return false;

  const res1 = await fetch(process.env.API_URL + "/project/generate-id", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
  });

  const { id } = await res1.json();

  const data = Object.fromEntries(formData.entries());
  const projectData = {
    name: data.name as string,
    description: data.description as string,
    creators: creators,
    projectUrl: data.projectUrl as string,
  };

  const file = data.picture as File;

  const fileForm = new FormData();
  fileForm.append("file", file);
  fileForm.append("filename", id);

  const imgupload = await fetch(process.env.API_URL + "/project/upload-image", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
    body: fileForm,
  });

  if (!imgupload.ok) {
    console.error("Failed to upload image", imgupload);
    return false;
  }

  const { url, fileId } = await imgupload.json();

  const response = await fetch(process.env.API_URL + "/project/add", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
    body: JSON.stringify({
      ...projectData,
      picture: {
        url,
        id: fileId,
      },
      id,
    }),
  });

  if (!response.ok) {
    console.error("Failed to add project", response);
    return false;
  }

  revalidatePath("/dashboard/manage");
  revalidatePath("/showcase");
  return true;
}

export async function listUsers(): Promise<UserDetail[]> {
  const token = await getTokens(await cookies(), {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  });

  if (!token) throw new Error("Unauthorized");

  const response = await fetch(process.env.BASE_URL + "/auth/users", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    console.error("Failed to fetch users", response);
    throw new Error("Failed to fetch users");
  }

  return response.json();
}

export async function checkUsername(username: string): Promise<boolean> {
  const response = await fetch(process.env.API_URL + "/auth/check-username", {
    method: "POST",
    body: JSON.stringify({ username }),
  });

  if (!response.ok) {
    console.error("Failed to check username", response);
    return false;
  }

  const { exists } = (await response.json()) as { exists: boolean };

  return exists;
}

export async function checkEmail(email: string): Promise<boolean> {
  const response = await fetch(process.env.API_URL + "/auth/check-email", {
    method: "POST",
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    console.error("Failed to check email", response);
    return false;
  }

  const { exists } = (await response.json()) as { exists: boolean };

  return exists;
}

export async function updateUser(userId: string, formData: FormData) {
  const token = await getTokens(await cookies(), {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  });

  if (!token) return false;

  const data = Object.fromEntries(formData.entries());
  const userData: Partial<UserDetail> = {
    id: userId,
    username: data.username as string,
    email: data.email as string,
  };

  const file = data.picture as File;

  if (file && file.size > 0) {
    const fileForm = new FormData();
    fileForm.append("file", file);
    fileForm.append("filename", userId);

    const imgupload = await fetch(process.env.BASE_URL + "/auth/upload-image", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
      body: fileForm,
    });

    if (!imgupload.ok) {
      console.error("Failed to upload image", imgupload);
      return false;
    }

    const { url, fileId } = await imgupload.json();
    userData.picture = {
      url,
      id: fileId,
    };
  }

  const response = await fetch(process.env.BASE_URL + "/auth/update", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    console.error("Failed to update user", response);
    return false;
  }

  const updatedUser = (await response.json()) as UserDetail;

  const { updateUser, setCustomUserClaims } = await authAction();

  await setCustomUserClaims(userId, {
    role: updatedUser.role,
    username: updatedUser.username,
  });

  await updateUser(userId, {
    displayName: updatedUser.username,
    email: updatedUser.email,
    emailVerified: updatedUser.emailVerified,
  });

  if (file && file.size > 0) {
    await updateUser(userId, {
      photoURL: updatedUser.picture.url + "?updatedAt=" + Date.now(),
    });
  }

  await refreshCreds();

  revalidatePath("/dashboard/admin/users");
  revalidatePath("/dashboard/account/profile");
  return true;
}
