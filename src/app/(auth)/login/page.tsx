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
    <div className="min-h-inherit border-x border-edge bg-red-950">hi</div>
  );
}
