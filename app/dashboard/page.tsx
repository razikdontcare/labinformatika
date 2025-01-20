import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getProjects } from "../actions";
import type { Project } from "@/type";
import parseFirebaseDate from "@/utils/parseFirebaseDate";
import ShowcaseItem from "@/components/ui/showcase-item";

export default async function Page() {
  const projects = await getProjects();
  const latestProjects = projects && projects.slice(0, 3);
  const totalProjects = projects && projects.length;
  const today = new Date().toISOString().split("T")[0];
  const projectsAddedToday =
    projects &&
    projects.filter(
      (project: Project) =>
        parseFirebaseDate(project.createdAt).toISOString().split("T")[0] ===
        today,
    ).length;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Home</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">Dashboard</h2>
            <div className="flex gap-4">
              <div className="flex-1 rounded border p-4">
                <h3 className="text-lg font-semibold">Total Projects</h3>
                <p className="text-2xl">{totalProjects}</p>
              </div>
              <div className="flex-1 rounded border p-4">
                <h3 className="text-lg font-semibold">Projects Added Today</h3>
                <p className="text-2xl">{projectsAddedToday}</p>
              </div>
            </div>
            <div className="rounded border p-4">
              <h3 className="text-lg font-semibold">Latest Projects</h3>
              <ul className="grid grid-cols-1 gap-4 pt-5 md:grid-cols-3 lg:grid-cols-3">
                {latestProjects &&
                  latestProjects.map((project: Project) => (
                    <ShowcaseItem key={project.id} items={project} />
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
