import { FirebaseDate } from "@/type";

export default function parseFirebaseDate(value: FirebaseDate | Date): Date {
  if (value instanceof Date) {
    return value;
  }
  if (
    !(
      value &&
      typeof value._seconds === "number" &&
      typeof value._nanoseconds === "number"
    )
  ) {
    throw new Error("Invalid FirebaseDate object");
  }
  const { _seconds, _nanoseconds } = value;
  return new Date(_seconds * 1000 + _nanoseconds / 1000000);
}
