import { LoginForm } from "@/components/client/login-form";
import { HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { loginAction } from "../actions";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Button asChild variant={"ghost"}>
          <Link href="/">
            <HomeIcon />
            Back to Homepage
          </Link>
        </Button>
        <LoginForm loginAction={loginAction} />
      </div>
    </div>
  );
}
