"use client";

import { Button } from "@/components/ui/button";
import { Plus, Minus, ImageUp } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { addProject } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}

export default function AddProjectForm() {
  const [creators, setCreators] = useState<{ name: string; nim: string }[]>([
    { name: "", nim: "" },
  ]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const router = useRouter();
  const { toast } = useToast();

  const handleAddProject = async (formData: FormData) => {
    const isAdded = await addProject(formData, creators);
    if (isAdded) {
      toast({
        title: "Project added",
        description: "Project has been added successfully",
        variant: "default",
      });
    } else {
      toast({
        title: "Project could not be added",
        description: "An error occurred while adding project",
        variant: "destructive",
      });
    }

    router.push("/dashboard/manage");
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
      if (file.size > 3 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 3MB",
          variant: "destructive",
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form action={handleAddProject} className="space-y-6">
      <div className="flex flex-col items-center">
        <div className="w-full md:w-96">
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
                onClick={() => document.getElementById("picture")?.click()}
              />
            ) : (
              <div
                className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-md border text-neutral-500"
                onClick={() => document.getElementById("picture")?.click()}
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
      <div className="grid gap-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <Label htmlFor="name" className="text-left">
            Name
          </Label>
          <Input id="name" name="name" className="col-span-3" required />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <Label htmlFor="description" className="text-left">
            Description
          </Label>
          <Textarea
            id="description"
            name="description"
            className="col-span-3 resize-none"
            required
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
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
          <div key={index} className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <Label htmlFor={`creatorName-${index}`} className="text-left">
              Name & NIM
            </Label>
            <div className="col-span-3 flex flex-col gap-4 md:flex-row">
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
      </div>
      <Button type="button" onClick={handleAddCreator}>
        <Plus className="mr-2 h-4 w-4" /> Add Creator
      </Button>
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <SubmitButton />
      </div>
    </form>
  );
}
