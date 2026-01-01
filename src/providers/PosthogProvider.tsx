"use client";

import { useEffect, useRef } from "react";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { authClient } from "@/lib/auth-client";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  // Use Better Auth's session hook
  const { data: session, isPending } = authClient.useSession();
  const hasIdentified = useRef(false);

  // 1. Initialize PostHog
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        person_profiles: "always",
        capture_pageview: false, // We capture pageviews manually via PostHogPageView
        capture_pageleave: true,
      });
    }
  }, []);

  // 2. Handle User Identification
  useEffect(() => {
    // Wait until session is finished loading
    if (isPending) return;

    // Check if user is authenticated
    if (session?.user && !hasIdentified.current) {
      if (typeof posthog !== "undefined") {
        try {
          // Identify using user ID for stable identification
          posthog.identify(session.user.id, {
            email: session.user.email,
            name: session.user.name,
          });

          // Set additional person properties
          posthog.setPersonProperties({
            email: session.user.email,
            name: session.user.name,
            userId: session.user.id,
            identifiedAt: new Date().toISOString(),
          });

          hasIdentified.current = true;
        } catch (error) {
          console.error("PostHog identification failed:", error);
        }
      }
    }

    // Reset when user logs out (session becomes null)
    if (!session && !isPending) {
      if (hasIdentified.current) {
        posthog.reset();
      }
      hasIdentified.current = false;
    }
  }, [session, isPending]);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
