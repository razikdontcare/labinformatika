import { Hono } from "hono";
import { handle } from "hono/vercel";
import { Project } from "@/type";
import { imageKitConfig } from "@/config";
import { DecodedIdToken } from "next-firebase-auth-edge/auth";
import ImageKit from "imagekit";
import path from "path";
import { db } from "@/lib/admin";
import generateId from "@/utils/generateId";
import isExists from "@/utils/isExists";

const img = new ImageKit(imageKitConfig);

export const runtime = "nodejs";

const app = new Hono<{ Variables: { user: DecodedIdToken } }>().basePath(
  "/project",
);

app.post("/upload-image", async (c) => {
  try {
    const body = await c.req.parseBody();
    const file = body["file"] as File;
    const filename = body["filename"] as string | undefined;
    if (!file) return c.json({ error: "No file found" }, 400);

    const buffer = await file.arrayBuffer();
    const folder = "labinformatika";
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
    console.error("Error in /upload-image route:", error);
    return c.json({ error: "Failed to upload image" }, 500);
  }
});

app.get("/generate-id", async (c) => {
  let id = generateId();
  while (await isExists(id)) id = generateId();
  return c.json({ id }, 200);
});

app.post("/add", async (c) => {
  try {
    const body = (await c.req.json()) as Project;
    const id = body.id == "" ? generateId() : body.id;
    const data: Project = {
      ...body,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.collection("projects").doc(data.id).set(data);
    return c.json(data, 201);
  } catch (error) {
    console.error("Error in /add route:", error);
    return c.json({ error: "Failed to add project" }, 500);
  }
});

app.get("/get/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const doc = await db.collection("projects").doc(id).get();
    const data = doc.data() as Project;
    return c.json(data, 200);
  } catch (error) {
    console.error("Error in /get route:", error);
    return c.json({ error: "Failed to get project" }, 500);
  }
});

app.get("/list", async (c) => {
  try {
    const snapshot = await db
      .collection("projects")
      .orderBy("updatedAt", "desc")
      .get();
    if (snapshot.empty) return c.json([], 200);
    const data = snapshot.docs.map((doc) => doc.data());
    return c.json(data, 200);
  } catch (error) {
    console.error("Error in /list route:", error);
    return c.json({ error: "Failed to list projects" }, 500);
  }
});

app.delete("/delete/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const projectRef = db.collection("projects").doc(id);
    const fileId = (await projectRef.get()).data()?.picture.id;
    await projectRef.delete();
    await img.deleteFile(fileId);
    return c.json({ message: "Project deleted" }, 200);
  } catch (error) {
    console.error("Error in /delete route:", error);
    return c.json({ error: "Failed to delete project" }, 500);
  }
});

app.put("/update/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = (await c.req.json()) as Partial<Project>;
    const data = {
      ...body,
      updatedAt: new Date(),
    };
    const res = await db.collection("projects").doc(id).update(data);
    return c.json(res, 200);
  } catch (error) {
    console.error("Error in /update route:", error);
    return c.json({ error: "Failed to update project" }, 500);
  }
});

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
