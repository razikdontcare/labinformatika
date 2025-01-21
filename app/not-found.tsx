import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page() {
  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-4 text-5xl font-extrabold text-foreground">
          404 - Not Found
        </h1>
        <p className="mb-8 text-xl text-gray-600">
          Sorry, the page you are looking for does not exist.
        </p>
        <Button asChild>
          <Link href="/">Go to Homepage</Link>
        </Button>
      </div>
    </div>
  );
}
