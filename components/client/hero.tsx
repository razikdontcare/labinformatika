import Navbar from "./navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "@/components/ui/image";
import logo from "../images/logo-if.png";
import PythonIllustration from "../illustrations/python";
import ServerIllustration from "../illustrations/server";
import WordpressIllustration from "../illustrations/wp";
import ProgrammingIllustration from "../illustrations/programming";

export default function Hero() {
  return (
    <>
      <section
        className="relative flex min-h-screen w-full flex-col overflow-clip"
        role="banner"
      >
        <PythonIllustration className="fixed -left-10 top-10 size-80 rotate-6 opacity-50" />
        <ServerIllustration className="fixed -right-10 top-10 size-80 -rotate-6 opacity-50" />
        <WordpressIllustration className="fixed -bottom-11 left-12 size-64 -rotate-2 opacity-50" />
        <ProgrammingIllustration className="fixed -bottom-11 right-0 size-80 -rotate-2 opacity-50" />
        <Navbar />
        <div className="flex flex-1 flex-col items-center justify-center bg-neutral-50">
          <div className="container z-10 mx-auto flex flex-col items-center justify-center gap-5">
            <div className="flex items-center justify-center rounded-xl border bg-gradient-to-tl from-neutral-300 from-5% to-white p-2 shadow-xl">
              <Image src={logo} alt="Informatika UNUD" className="size-14" />
            </div>
            <h1 className="flex flex-col items-center justify-center text-center text-7xl font-medium capitalize text-foreground">
              <span>Inovasi Teknologi</span>
              <span className="text-neutral-500">Untuk Masa Depan</span>
            </h1>
            <p className="text-lg">
              Laboratorium Informatika Universitas Udayana
            </p>
            <Button asChild>
              <Link href="/showcase">Showcase</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
