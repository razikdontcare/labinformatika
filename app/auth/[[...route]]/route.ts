import { Hono } from "hono";
import { handle } from "hono/vercel";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { UserDetail, UserDetailServer } from "@/type";
import bcrypt from "bcryptjs";
import { getFirebaseAuth } from "next-firebase-auth-edge";
import { clientConfig, serverConfig, imageKitConfig } from "@/config";
import { DecodedIdToken } from "next-firebase-auth-edge/auth";
import ImageKit from "imagekit";
import path from "path";
import { customAlphabet } from "nanoid";

import { getFirestore } from "firebase/firestore";
import { initializeServerApp } from "firebase/app";

const serverApp = initializeServerApp(clientConfig, {});
const db = getFirestore(serverApp);

const img = new ImageKit(imageKitConfig);

export const runtime = "nodejs";

const app = new Hono<{ Variables: { user: DecodedIdToken } }>().basePath(
  "/auth",
);

const PUBLIC_PATH = ["/login", "/register", "/check-username", "/check-email"];

function authAction() {
  return getFirebaseAuth({
    apiKey: clientConfig.apiKey,
    serviceAccount: serverConfig.serviceAccount,
  });
}

const generateId = (prefix?: string): string => {
  const pre = prefix ?? "IFLAB";
  const length = 11;
  const year = new Date().getFullYear();
  const nanoid = customAlphabet("1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ", length);
  return pre + year + nanoid();
};

app.use(async (c, next) => {
  const authorization = c.req.header("Authorization")?.split(" ")[1];

  if (!PUBLIC_PATH.includes(c.req.path)) {
    if (!authorization) {
      return c.json({ error: "Unauthorized: No token provided" }, 401);
    }
    try {
      const decodedToken = await authAction().verifyIdToken(authorization);
      c.set("user", decodedToken);
    } catch (error) {
      console.error("Error verifying token:", error);
      return c.json({ error: "Unauthorized: Invalid token" }, 401);
    }
  }
  await next();
});

app.post("/login", async (c) => {
  try {
    const { username, password } = await c.req.json();
    const ref = collection(db, "users");
    const q = query(ref, where("username", "==", username));
    const doc = await getDocs(q);
    if (doc.empty) {
      return c.json({ error: "User not found" }, 404);
    }
    const user = doc.docs[0].data() as UserDetail;
    const userId = doc.docs[0].id;

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return c.json({ error: "Invalid password" }, 401);
    }

    const token = await authAction().createCustomToken(userId, {
      username,
      role: user.role,
    });

    return c.json({
      token,
      email: user.email,
      emailVerified: user.emailVerified,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error logging in:", error.message);
      return c.json({ error: error.message }, 500);
    }
    return c.json({ error: "An error occurred" }, 500);
  }
});

app.post("/register", async (c) => {
  try {
    const { username, password, email, role, emailVerified } =
      await c.req.json();

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const usersRef = collection(db, "users");
    const userQuery = query(usersRef, where("username", "==", username));
    const emailQuery = query(usersRef, where("email", "==", email));

    const userSnapshot = await getDocs(userQuery);
    const emailSnapshot = await getDocs(emailQuery);

    if (!userSnapshot.empty) {
      return c.json({ error: "Username already taken" }, 400);
    }

    if (!emailSnapshot.empty) {
      return c.json({ error: "Email already taken" }, 400);
    }

    const userId = generateId("IFUSER");

    const user: UserDetailServer = {
      id: userId,
      username,
      email,
      passwordHash,
      createdAt: new Date(),
      role: role || "user",
      emailVerified: emailVerified || false,
      picture: {
        url: "",
        id: "",
      },
    };

    const userRef = doc(usersRef, userId);
    await setDoc(userRef, user);

    return c.json({ ...user }, 200);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error registering user:", error.message);
      return c.json({ error: error.message }, 500);
    }
    return c.json({ error: "Failed to register user" }, 500);
  }
});

app.get("/users", async (c) => {
  try {
    const user = c.get("user");
    if (user.role !== "admin") return c.json({ error: "Unauthorized" }, 401);
    const ref = collection(db, "users");
    const snapshot = await getDocs(ref);
    if (snapshot.empty) {
      return c.json([] as UserDetail[], 200);
    }
    const users = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as UserDetail[];
    return c.json(users, 200);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error getting users:", error.message);
      return c.json({ error: error.message }, 500);
    }
    return c.json({ error: "An error occurred" }, 500);
  }
});

app.post("/check-username", async (c) => {
  try {
    const { username } = (await c.req.json()) as { username: string };
    const ref = collection(db, "users");
    const q = query(ref, where("username", "==", username));
    const userSnapshot = await getDocs(q);

    const usernameExists = !userSnapshot.empty;

    return c.json({ exists: usernameExists }, 200);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error checking username:", error.message);
      return c.json({ error: error.message }, 500);
    }
    return c.json({ error: "Failed to check username" }, 500);
  }
});

app.post("/check-email", async (c) => {
  try {
    const { email } = (await c.req.json()) as { email: string };
    const ref = collection(db, "users");
    const q = query(ref, where("email", "==", email));
    const userSnapshot = await getDocs(q);

    const emailExists = !userSnapshot.empty;

    return c.json({ exists: emailExists }, 200);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error checking email:", error.message);
      return c.json({ error: error.message }, 500);
    }
    return c.json({ error: "Failed to check email" }, 500);
  }
});

app.put("/update", async (c) => {
  try {
    const user = c.get("user");
    if (!user) return c.json({ error: "Unauthorized" }, 401);
    const body = (await c.req.json()) as Partial<UserDetail>;
    if (!body.id) return c.json({ error: "User ID is required" }, 400);
    if (body.id !== user.uid && user.role !== "admin")
      return c.json({ error: "Unauthorized" }, 401);
    const userRef = doc(db, "users", body.id);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      return c.json({ error: "User not found" }, 404);
    }
    await updateDoc(userRef, body);
    const updatedUserRef = await getDoc(userRef);
    const updatedUser = updatedUserRef.data() as UserDetail;
    return c.json(updatedUser, 200);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error updating user:", error.message);
      return c.json({ error: error.message }, 500);
    }
    return c.json({ error: "Failed to update user" }, 500);
  }
});

app.post("/upload-image", async (c) => {
  try {
    const body = await c.req.parseBody();
    const file = body["file"] as File;
    const filename = body["filename"] as string | undefined;
    if (!file) return c.json({ error: "No file provided" }, 400);

    const buffer = await file.arrayBuffer();
    const folder = "labinformatika/users";
    const fileExtension =
      filename && path.extname(filename) !== ""
        ? path.extname(filename)
        : path.extname(file.name);
    const res = await img.upload({
      file: Buffer.from(buffer),
      fileName: filename
        ? path.basename(filename, fileExtension) + fileExtension
        : file.name,
      useUniqueFileName: false,
      folder,
    });
    return c.json({ url: res.url, fileId: res.fileId }, 200);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error uploading image:", error.message);
      return c.json({ error: error.message }, 500);
    }
    return c.json({ error: "Failed to upload image" }, 500);
  }
});

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
