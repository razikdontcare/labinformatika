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
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";

const links = [{ name: "About", href: "/about" }];

export default function Navbar() {
  const pathname = usePathname();
  const { user } = useAuth();

  console.log(JSON.stringify(user));

  return (
    <>
      <header className="z-10 flex w-full items-center justify-center bg-white shadow-md">
        <div className="container mx-auto flex max-w-7xl items-center justify-between p-3">
          <div className="flex items-center justify-center gap-3">
            <Link href="/">
              <div className="flex cursor-pointer items-center justify-center">
                <Image src={logo} alt="Informatika UNUD" className="size-10" />
              </div>
            </Link>
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
          </div>
          <div className="flex items-center justify-center gap-3">
            <Button asChild variant={"outline"}>
              <Link href={user ? "/dashboard" : "/login"}>
                {user ? "Dashboard" : "Login"}
              </Link>
            </Button>
            {pathname !== "/showcase" && (
              <Button asChild>
                <Link href="/showcase">Showcase</Link>
              </Button>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
