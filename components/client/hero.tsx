import Navbar from "./navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "@/components/ui/image";
import logo from "../images/logo-if.png";
import PythonIllustration from "../illustrations/python";
import ServerIllustration from "../illustrations/server";
import WordpressIllustration from "../illustrations/wp";
import ProgrammingIllustration from "../illustrations/programming";
import DotPattern from "../ui/dot-pattern";
import { cn } from "@/lib/utils";

export default function Hero() {
  return (
    <>
      <section
        className="relative flex min-h-screen w-full flex-col overflow-clip"
        role="banner"
      >
        <PythonIllustration className="-left-10 top-10 hidden size-80 rotate-6 opacity-50 md:fixed md:flex" />
        <ServerIllustration className="-right-10 top-10 hidden size-80 -rotate-6 opacity-50 md:fixed md:flex" />
        <WordpressIllustration className="-bottom-11 left-12 hidden size-64 -rotate-2 opacity-50 md:fixed md:flex" />
        <ProgrammingIllustration className="-bottom-11 right-0 hidden size-80 -rotate-2 opacity-50 md:fixed md:flex" />
        <Navbar />
        <div className="flex flex-1 flex-col items-center justify-center bg-neutral-50 p-5 md:p-0">
          <div className="container z-10 mx-auto flex flex-col items-center justify-center gap-5">
            <div className="flex items-center justify-center rounded-xl border bg-gradient-to-tl from-neutral-300 from-5% to-white p-2 shadow-xl">
              <Image
                src={logo}
                alt="Informatika UNUD"
                className="size-10 md:size-14"
              />
            </div>
            <h1 className="flex flex-col items-center justify-center text-center text-3xl font-medium capitalize text-foreground md:text-7xl">
              <span>Inovasi Teknologi</span>
              <span className="text-neutral-500">Untuk Masa Depan</span>
            </h1>
            <p className="text-center text-lg">
              Laboratorium Informatika Universitas Udayana
            </p>
            <Button asChild>
              <Link href="/showcase">Showcase</Link>
            </Button>
          </div>
        </div>
        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(680px_circle_at_center,white,transparent)]",
          )}
        />
      </section>
    </>
  );
}
