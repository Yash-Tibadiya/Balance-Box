"use client";

import { useEffect, useRef } from "react";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { authClient } from "@/lib/auth-client";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  // Use Better Auth's session hook
  const { data: session, isPending } = authClient.useSession();
  const hasIdentified = useRef(false);
  const hasTrackedLogin = useRef(false);

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

  // 2. Handle User Identification and Login Events
  useEffect(() => {
    // Wait until session is finished loading
    if (isPending) return;

    // Check if user is authenticated
    if (session?.user && !hasIdentified.current) {
      if (typeof posthog !== "undefined") {
        try {
          const user = session.user;

          // Identify using user ID for stable identification
          posthog.identify(user.id, {
            email: user.email,
            name: user.name,
          });

          // Set additional person properties
          posthog.setPersonProperties({
            email: user.email,
            name: user.name,
            userId: user.id,
            image: user.image,
            createdAt: user.createdAt,
            identifiedAt: new Date().toISOString(),
          });

          hasIdentified.current = true;

          // Track login event (only once per session)
          if (!hasTrackedLogin.current) {
            const createdAt = new Date(user.createdAt);
            const now = new Date();
            const diffMs = now.getTime() - createdAt.getTime();
            const isNewUser = diffMs < 60000; // Created within last 60 seconds

            if (isNewUser) {
              posthog.capture("new_user_created", {
                userId: user.id,
                email: user.email,
                name: user.name,
                image: user.image,
                timestamp: new Date().toISOString(),
              });
            } else {
              posthog.capture("user_login_successfully", {
                userId: user.id,
                email: user.email,
                name: user.name,
                image: user.image,
                timestamp: new Date().toISOString(),
              });
            }
            hasTrackedLogin.current = true;
          }
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
      hasTrackedLogin.current = false;
    }
  }, [session, isPending]);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
