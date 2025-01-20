import { FirebaseDate } from "@/type";

export default function parseFirebaseDate(value: FirebaseDate): Date {
  const { _seconds, _nanoseconds } = value;
  return new Date(_seconds * 1000 + _nanoseconds / 1000000);
}
