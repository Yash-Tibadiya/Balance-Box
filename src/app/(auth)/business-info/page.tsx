"use client";

import { BusinessInfoForm } from "@/components/forms/business-info-form";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

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

        // Check if business info is already completed
        const response = await fetch("/api/user/check-business-info");
        const result = await response.json();

        if (result.hasBusinessInfo) {
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
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
        <div className="text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6 md:max-w-3xl">
        <Link
          href="/"
          className="flex items-center gap-3 self-center font-medium"
        >
          <div className="bg-primary text-primary-foreground flex size-10 items-center justify-center rounded-md">
            <Image
              width={50}
              height={50}
              src={"/images/better-auth-starter.png"}
              alt="Better Auth Starter Logo"
              className="rounded-md dark:invert"
              priority
            />
          </div>
          {/* TODO: Add name and Logo */}
          <span className="text-3xl font-bold">Balance Box</span>
        </Link>
        <BusinessInfoForm />
      </div>
    </div>
  );
}

