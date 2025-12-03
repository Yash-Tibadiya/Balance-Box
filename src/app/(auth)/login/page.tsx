"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { checkCurrentUserBusinessInfo } from "@/models/users-actions";
import { LoginForm } from "../_components/login-form";
import { cn } from "@/lib/utils";
import LoginHeroPanel from "../_components/login-hero-panel";

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
      <div className="flex min-h-[calc(100svh-11rem)] flex-col items-center justify-center p-6 md:p-10">
        <div className="loader-bar"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 min-h-[calc(100svh-11rem)] h-full w-full">
      <div className="flex items-center justify-center h-full w-full bg-zinc-200/70 dark:bg-neutral-900"></div>

      <div className="flex items-center justify-center h-full w-full bg-linear-to-br from-white dark:from-[#141414] to-accent dark:to-neutral-950 relative">
        <LoginHeroPanel />
      </div>
    </div>
  );
}
