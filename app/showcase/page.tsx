import ShowcaseContent from "@/components/client/showcase";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Showcase",
};

export default function Showcase() {
  return (
    <>
      <ShowcaseContent />
    </>
  );
}
