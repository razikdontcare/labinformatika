"use client";

import { Button } from "@/components/ui/button";
import { Pencil, Plus, Trash, Minus, ImageUp } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import { deleteProject, addProject } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ManageProjects({
  items,
}: {
  items: Project[] | undefined;
}) {
  const [projects, setProjects] = useState<Project[] | undefined>(items);
  const [creators, setCreators] = useState<{ name: string; nim: string }[]>([
    { name: "", nim: "" },
  ]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const router = useRouter();

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

  const handleAddProject = async (formData: FormData) => {
    setIsAdding(true);
    const isAdded = await addProject(formData, creators);
    setIsAdding(false);
    if (isAdded) {
      toast({
        title: "Project added",
        description: "Project has been added successfully",
        variant: "default",
      });
      setOpen(false);
      router.refresh();
    } else {
      toast({
        title: "Project could not be added",
        description: "An error occurred while adding project",
        variant: "destructive",
      });
      setOpen(false);
    }
  };

  const handleAddCreator = () => {
    setCreators([...creators, { name: "", nim: "" }]);
  };

  const handleRemoveCreator = (index: number) => {
    if (creators.length > 1) {
      setCreators(creators.filter((_, i) => i !== index));
    }
  };

  const handleCreatorChange = (index: number, field: string, value: string) => {
    const updatedCreators = creators.map((creator, i) =>
      i === index ? { ...creator, [field]: value } : creator,
    );
    setCreators(updatedCreators);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Projects</h1>
        <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[540px]">
            <DialogHeader>
              <DialogTitle>Add Project</DialogTitle>
              <DialogDescription>
                Add a new project to the showcase list
              </DialogDescription>
            </DialogHeader>
            <form action={handleAddProject}>
              <div className="flex w-full flex-col items-center justify-center">
                <div className="flex w-64 items-center justify-center">
                  <AspectRatio
                    ratio={16 / 9}
                    className="overflow-hidden rounded-md border bg-muted"
                  >
                    {imagePreview ? (
                      <Image
                        src={imagePreview}
                        alt="Image Preview"
                        fill
                        className="cursor-pointer object-cover"
                        onClick={() =>
                          document.getElementById("picture")?.click()
                        }
                      />
                    ) : (
                      <div
                        className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-md border text-neutral-500"
                        onClick={() =>
                          document.getElementById("picture")?.click()
                        }
                      >
                        <ImageUp />
                        <span>Click to select an image</span>
                      </div>
                    )}
                  </AspectRatio>
                </div>
                <Input
                  id="picture"
                  name="picture"
                  type="file"
                  accept="image/png, image/jpeg"
                  className="hidden"
                  required
                  onChange={handleImageChange}
                />
              </div>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-left">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-left">
                    Description
                  </Label>
                  <Input
                    id="description"
                    name="description"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="projectUrl" className="text-left">
                    Project Link
                  </Label>
                  <Input
                    id="projectUrl"
                    name="projectUrl"
                    type="url"
                    className="col-span-3"
                    required
                  />
                </div>
                {creators.map((creator, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-4 items-center gap-4"
                  >
                    <Label
                      htmlFor={`creatorName-${index}`}
                      className="text-left"
                    >
                      Name & NIM
                    </Label>
                    <div className="col-span-3 flex gap-4">
                      <Input
                        id={`creatorName-${index}`}
                        name={`creatorName-${index}`}
                        value={creator.name}
                        onChange={(e) =>
                          handleCreatorChange(index, "name", e.target.value)
                        }
                        className="flex-1"
                        required
                      />
                      <Input
                        id={`creatorNim-${index}`}
                        name={`creatorNim-${index}`}
                        value={creator.nim}
                        onChange={(e) =>
                          handleCreatorChange(index, "nim", e.target.value)
                        }
                        className="flex-1"
                        required
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleRemoveCreator(index)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button type="button" onClick={handleAddCreator}>
                  <Plus className="mr-2 h-4 w-4" /> Add Creator
                </Button>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" disabled={isAdding}>
                  {isAdding ? "Saving..." : "Save"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <ul>
        {projects &&
          projects.map((project) => (
            <li
              key={project.id}
              className="mt-5 flex items-center justify-between gap-8 border-b p-2"
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
