"use client";

import { Button } from "@/components/ui/button";
import { Pencil, Plus, Trash } from "lucide-react";
import Image from "next/image";
import { Project } from "@/type";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { deleteProject } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

import Link from "next/link";

export default function ManageProjects({
  items,
}: {
  items: Project[] | undefined;
}) {
  const [projects, setProjects] = useState<Project[] | undefined>(items);

  const { toast } = useToast();

  const handleEdit = (id: string) => {
    console.log("Edit project with id: ", id);
  };

  const handleDelete = async (id: string, name: string) => {
    toast({
      title: `Project ${name} deleted`,
      description: "Project has been deleted successfully",
      variant: "default",
    });
    const isDeleted = await deleteProject(id);
    if (!isDeleted) {
      toast({
        title: `Project ${name} could not be deleted`,
        description: "An error occurred while deleting project",
        variant: "destructive",
      });
    }
    setProjects((prev) => prev?.filter((project) => project.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Projects</h1>
        <Button asChild>
          <Link href="/dashboard/manage/add">
            <Plus className="mr-2 h-4 w-4" /> Add New Project
          </Link>
        </Button>
      </div>
      <ul className="space-y-4">
        {projects &&
          projects.map((project) => (
            <li
              key={project.id}
              className="flex flex-col items-center justify-between gap-4 border-b p-2 md:flex-row md:gap-8"
            >
              <div className="flex flex-col items-center gap-4 md:flex-row">
                <div className="relative h-32 w-full flex-shrink-0 md:h-20 md:w-32">
                  <Image
                    src={project.picture.url}
                    alt={project.name}
                    fill
                    className="rounded-md object-cover"
                  />
                </div>
                <div className="flex flex-col text-center md:text-left">
                  <span className="text-xl font-medium">{project.name}</span>
                  <span className="text-sm text-neutral-500">
                    {project.description}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => handleEdit(project.id)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Delete {project.name}?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete {project.name}.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(project.id, project.name)}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
