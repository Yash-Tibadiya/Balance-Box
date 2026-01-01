"use client";

import { useCallback } from "react";
import { usePostHog } from "posthog-js/react";

type EventProperties = Record<string, unknown>;

export function useEvent() {
  const posthog = usePostHog();

  const sendEvent = useCallback(
    (eventName: string, properties?: EventProperties) => {
      posthog?.capture(eventName, {
        ...properties,
        timestamp: new Date().toISOString(),
      });
    },
    [posthog]
  );

  return { sendEvent };
}
