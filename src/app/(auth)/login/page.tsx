"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { checkCurrentUserBusinessInfo } from "@/models/users-actions";
import { LoginForm } from "../_components/login-form";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data } = await authClient.getSession();
        if (data) {
          // User is already logged in, check business info using model function
          const hasInfo = await checkCurrentUserBusinessInfo();

          if (hasInfo) {
            router.push("/");
          } else {
            router.push("/business-info");
          }
        }
      } catch (error) {
        console.error("Error checking session:", error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
        <div className="text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto border-x border-edge md:max-w-5xl">
        <div
          className={cn(
            "h-8 px-2",
            "screen-line-after",
            "before:absolute before:-left-[100vw] before:-z-1 before:h-full before:w-[200vw]",
            "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56"
          )}
        />

        <div className="h-[551px]">
          <div className="bg-red-950"></div>
        </div>

        <div
          className={cn(
            "h-8 px-2",
            "screen-line-before",
            "after:absolute after:-left-[100vw] after:-z-1 after:h-full after:w-[200vw]",
            "after:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] after:bg-size-[10px_10px] after:[--pattern-foreground:var(--color-edge)]/56"
          )}
        />
      </div>
    </>
  );
}
