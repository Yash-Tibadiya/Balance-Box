"use client";

import { BusinessInfoForm } from "@/app/(auth)/_components/business-info-form";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { checkCurrentUserBusinessInfo } from "@/models/users-actions";
import LoginHeroPanel from "../_components/login-hero-panel";

export default function BusinessInfoPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data } = await authClient.getSession();
        if (!data) {
          // User is not logged in, redirect to login
          router.push("/login");
          return;
        }

        // Check if business info is already completed using model function
        const hasInfo = await checkCurrentUserBusinessInfo();

        if (hasInfo) {
          // Business info already completed, redirect to home
          router.push("/");
        }
      } catch (error) {
        console.error("Error checking session:", error);
        router.push("/login");
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
    <div className="flex flex-col lg:flex-row min-h-[calc(100svh-11rem)] h-full w-full">
      <div className="flex items-center justify-center w-full bg-zinc-200/70 dark:bg-neutral-900">
        <BusinessInfoForm />
      </div>

      <div className="flex items-center justify-center w-full bg-linear-to-br from-white dark:from-[#141414] to-accent dark:to-neutral-950 relative">
        <LoginHeroPanel />
      </div>
    </div>
  );
}
