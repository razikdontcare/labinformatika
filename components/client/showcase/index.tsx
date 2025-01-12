import Navbar from "../navbar";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ShowcaseItem from "@/components/ui/showcase-item";

const items = Array.from({ length: 5 }, (_, i) => i);

export default function ShowcaseContent() {
  return (
    <>
      <section className="flex min-h-screen w-full flex-col" role="banner">
        <Navbar />
        <div className="flex w-full flex-1 flex-col bg-neutral-50 p-3">
          <div className="container mx-auto flex max-w-5xl flex-col gap-3">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={"/"}>Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Showcase</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {items.map((_, i) => (
                <ShowcaseItem key={i} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
