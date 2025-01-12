import Navbar from "./navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "@/components/ui/image";
import logo from "../images/logo-if.png";

export default function Hero() {
  return (
    <>
      <section className="flex min-h-screen w-full flex-col" role="banner">
        <Navbar />
        <div className="flex flex-1 flex-col items-center justify-center bg-neutral-50">
          <div className="container mx-auto flex flex-col items-center justify-center gap-5">
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
