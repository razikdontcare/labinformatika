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

const links = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  return (
    <>
      <div className="flex w-full items-center justify-center">
        <div className="container mx-auto flex items-center justify-between p-3">
          <div className="flex items-center justify-center gap-3">
            <Image src={logo} alt="Informatika UNUD" className="size-10" />
            <div className="flex items-center justify-center">
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
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Button asChild variant={"outline"}>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/showcase">Showcase</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
