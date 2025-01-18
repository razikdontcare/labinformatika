"use client";
import * as React from "react";

// import { SearchForm } from "@/components/search-form";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Button } from "./ui/button";
import { HomeIcon } from "lucide-react";
import { NavUser } from "./nav-user";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { user } = useAuth();

  const role = user?.customClaims.role ?? "user";

  const data = {
    user: {
      name: user?.displayName ?? "",
      email: user?.email ?? "",
      avatar: user?.photoURL ?? "",
    },
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        items: [
          {
            title: "Home",
            url: "/dashboard",
            isActive: pathname === "/dashboard",
          },
          {
            title: "Add Projects",
            url: "/dashboard/add",
            isActive: pathname === "/dashboard/add",
          },
        ],
      },
      ...(role === "admin"
        ? [
            {
              title: "Admin",
              url: "/dashboard/admin",
              items: [
                {
                  title: "Manage Users",
                  url: "/dashboard/admin/users",
                  isActive: pathname === "/dashboard/admin/users",
                },
              ],
            },
          ]
        : []),
    ],
  };
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        {/* <SearchForm /> */}
        <Button asChild variant={"ghost"}>
          <Link href="/">
            <HomeIcon />
            Back to Homepage
          </Link>
        </Button>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
