"use client";

import ShowcaseItem from "@/components/ui/showcase-item";
import { useAuth } from "@/lib/AuthContext";
import { Project } from "@/type";
import parseFirebaseDate from "@/utils/parseFirebaseDate";

export default function DashboardContent({
  projects,
}: {
  projects: Project[] | undefined;
}) {
  const { user } = useAuth();

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

  const currentHour = new Date().getHours();
  let greeting = "Good Morning";
  if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good Afternoon";
  } else if (currentHour >= 18) {
    greeting = "Good Evening";
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold capitalize">
          {greeting}, {user?.displayName}!
        </h2>
        <div className="flex gap-2">
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
    </>
  );
}
