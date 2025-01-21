import AboutContent from "@/components/client/about";
import type { Metadata } from "next";

import Navbar from "@/components/client/navbar";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
// import MonitorIllustration from "@/components/illustrations/monitor";
// import ManagerProfile from "@/components/client/managerProfile";

export const metadata: Metadata = {
  title: "About",
};

export default function About() {
  return (
    <>
      <section className="flex min-h-screen w-full flex-col" role="banner">
        <Navbar />
        <div className="flex w-full flex-1 flex-col bg-neutral-50 p-3">
          <div className="container z-10 mx-auto flex max-w-5xl flex-col gap-3">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={"/"}>Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>About</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <AboutContent />
          </div>
        </div>
      </section>
    </>
  );
}
