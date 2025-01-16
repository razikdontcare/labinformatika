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
import MonitorIllustration from "@/components/illustrations/monitor";

export default function AboutContent() {
  return (
    <>
      <MonitorIllustration className="-bottom-20 right-0 hidden size-[30rem] opacity-50 md:fixed md:flex" />
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
            <h1 className="mt-6 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Tentang Kami
            </h1>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta
              totam iusto aperiam ducimus eius nesciunt in beatae earum suscipit
              doloremque itaque provident ipsum ipsam ut iure, maiores minus
              veritatis accusantium aut repellendus. Soluta, minima. Deserunt,
              sunt nobis! Officiis voluptatem iste, ducimus laudantium rem minus
              dignissimos ad voluptas molestias odio totam voluptate similique
              temporibus harum aut qui tempore animi nulla, ea quisquam,
              deserunt aliquid ullam? Asperiores dignissimos eveniet
              perspiciatis. Suscipit magni vitae odio libero odit harum,
              provident velit! Impedit nemo tenetur voluptates laudantium,
              perspiciatis nulla praesentium porro eius magnam blanditiis iusto
              cupiditate quibusdam soluta recusandae? Perferendis, eaque beatae!
              Molestiae, reiciendis officiis.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
