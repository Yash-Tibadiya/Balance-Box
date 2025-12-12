"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import LoginHeroPanel from "../_components/login-hero-panel";
import { BusinessInfoForm } from "@/app/(auth)/_components/business-info-form";

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
        // Proxy middleware will handle business info check
        // If user already has business info, proxy will redirect them
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
      <div className="flex min-h-[calc(100svh-11rem)] flex-col items-center justify-center p-6 md:p-10 dark:bg-black">
        <Image
          src="https://res.cloudinary.com/dwguas7rt/image/upload/v1765544789/loading_glkn85.gif"
          alt="loading"
          width={100}
          height={100}
          className="dark:invert"
          unoptimized
        />
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
