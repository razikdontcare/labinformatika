"use client";
import Image from "../ui/image";
import logo from "../images/logo-if.png";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/AuthContext";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";

const links = [
  { name: "About", href: "/about" },
  { name: "Showcase", href: "/showcase" },
];

export default function Navbar() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="z-10 flex w-full items-center justify-center bg-white shadow-md">
        <div className="container mx-auto flex max-w-7xl items-center justify-between p-3">
          <div className="flex items-center justify-center gap-3">
            <Link href="/">
              <div className="flex cursor-pointer items-center justify-center">
                <Image src={logo} alt="Informatika UNUD" className="size-10" />
                <span className="ml-2 text-lg font-bold">Lab Informatika</span>
              </div>
            </Link>
          </div>
          <div className="hidden items-center justify-center gap-3 md:flex">
            <nav>
              <NavigationMenu>
                <NavigationMenuList>
                  {links.map((link, i) => (
                    <NavigationMenuItem key={i}>
                      <Link href={link.href} legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          {link.name}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </nav>
            <Button asChild variant={"outline"}>
              <Link href={user ? "/dashboard" : "/login"}>
                {user ? "Dashboard" : "Login"}
              </Link>
            </Button>
          </div>
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <nav className="mt-10 flex flex-col gap-3">
                  {links.map((link, i) => (
                    <Link key={i} href={link.href}>
                      {link.name}
                    </Link>
                  ))}
                  <Button asChild variant={"outline"}>
                    <Link href={user ? "/dashboard" : "/login"}>
                      {user ? "Dashboard" : "Login"}
                    </Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
