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

const links = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Showcase", href: "/showcase" },
];

export default function Navbar() {
  return (
    <>
      <div className="flex w-full items-center justify-center">
        <div className="container mx-auto flex items-center justify-between p-5">
          <div className="flex items-center justify-center gap-3">
            <Image src={logo} alt="Informatika UNUD" className="size-12" />
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
      </div>
    </>
  );
}