"use client";

import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
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
      <ul>
        {projects &&
          projects.map((project) => (
            <li
              key={project.id}
              className="flex items-center justify-between border-b p-2"
            >
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-32 flex-shrink-0">
                  <Image
                    src={project.picture}
                    alt={project.name}
                    fill
                    className="rounded-md object-cover"
                  />
                </div>
                <div className="flex flex-col">
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
