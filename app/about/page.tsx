import AboutContent from "@/components/client/about";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function About() {
  return (
    <>
      <AboutContent />
    </>
  );
}
