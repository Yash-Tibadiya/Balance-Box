"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { LoginForm } from "../_components/login-form";
import LoginHeroPanel from "../_components/login-hero-panel";
import { checkCurrentUserBusinessInfo } from "@/models/users-actions";

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
      <div className="flex min-h-[calc(100svh-11rem)] flex-col items-center justify-center p-6 md:p-10 dark:bg-black">
        <Image
          src="/gif/loading.gif"
          alt="loading"
          width={100}
          height={100}
          className="dark:invert"
          // unoptimized
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100svh-11rem)] h-full w-full">
      <div className="flex items-center justify-center w-full bg-zinc-200/70 dark:bg-neutral-900">
        <LoginForm />
      </div>

      <div className="flex items-center justify-center w-full bg-linear-to-br from-white dark:from-[#141414] to-accent dark:to-neutral-950 relative">
        <LoginHeroPanel />
      </div>
    </div>
  );
}
