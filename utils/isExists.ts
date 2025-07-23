import { db } from "@/lib/admin";
import type { LabCollection } from "@/type";

export default async function isExists(
  id: string,
  collection: LabCollection = "projects",
): Promise<boolean> {
  if (id === "") return true;
  const doc = await db.collection(collection).doc(id).get();
  return doc.exists;
}
