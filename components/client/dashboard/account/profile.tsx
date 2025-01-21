"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import React, { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import {
  refreshCreds,
  updateUser,
  checkEmail,
  checkUsername,
} from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/firebase";

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const [name, setName] = useState(
    (user?.customClaims.username as string) ?? "",
  );
  const [email, setEmail] = useState(user?.email ?? "");
  const [role] = useState((user?.customClaims.role as string) ?? "User"); // Role is readonly
  const [imagePreview, setImagePreview] = useState<string | null>(
    user?.photoURL ?? null,
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Check if the username is already taken
      const isUsernameTaken = await checkUsername(name);
      if (isUsernameTaken) {
        toast({
          title: "Username already taken",
          description: "Please choose a different username",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Check if the email is already taken
      const isEmailTaken = await checkEmail(email);
      if (isEmailTaken) {
        toast({
          title: "Email already taken",
          description: "Please choose a different email",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("username", name);
      formData.append("email", email);
      if (imageFile) {
        formData.append("picture", imageFile);
      }

      const response = await updateUser(user?.uid as string, formData);

      if (!response) {
        toast({
          title: "Failed to update profile",
          description: "Please try again later",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully",
        });

        await refreshCreds();
        await auth.currentUser?.reload();
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to update profile",
        description: "Please try again later",
        variant: "destructive",
      });
      setLoading(false);
    }
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
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Profile Management</h2>
      <form onSubmit={handleSave} className="space-y-4">
        <div className="flex flex-col items-center">
          <div className="flex h-64 w-64 items-center justify-center">
            <AspectRatio
              ratio={1}
              className="overflow-hidden rounded-full border bg-muted"
            >
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Profile Picture"
                  fill
                  className="cursor-pointer object-cover hover:opacity-75"
                  onClick={() =>
                    document.getElementById("profilePicture")?.click()
                  }
                />
              ) : (
                <div
                  className="flex h-full w-full cursor-pointer flex-col items-center justify-center text-neutral-500"
                  onClick={() =>
                    document.getElementById("profilePicture")?.click()
                  }
                >
                  <span>Click to select a picture</span>
                </div>
              )}
            </AspectRatio>
          </div>
          <Input
            id="profilePicture"
            name="profilePicture"
            type="file"
            accept="image/png, image/jpeg"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
        <div>
          <Label htmlFor="name">Username</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="role">Role</Label>
          <Input
            id="role"
            type="text"
            value={role}
            readOnly
            className="cursor-not-allowed bg-gray-100"
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={
            (name === (user?.customClaims.username as string) &&
              email === user?.email &&
              imagePreview === user?.photoURL) ||
            name === "" ||
            email === "" ||
            loading
          }
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default Profile;
