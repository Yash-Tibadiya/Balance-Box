"use client";

import { useCallback, useRef } from "react";

type TransitionVariant = "circle" | "circle-blur" | "polygon";
type TransitionPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "center";

interface UseThemeTransitionOptions {
  variant?: TransitionVariant;
  position?: TransitionPosition;
  duration?: number;
  blurAmount?: number;
}

export function useThemeTransition(options: UseThemeTransitionOptions = {}) {
  const {
    variant = "circle-blur",
    position = "top-right",
    duration = 500,
    blurAmount = 100,
  } = options;

  const triggerRef = useRef<HTMLElement | null>(null);

  const getPosition = useCallback(
    (element?: HTMLElement | null) => {
      if (element) {
        const rect = element.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };
      }

      const positions: Record<TransitionPosition, { x: number; y: number }> = {
        "top-left": { x: 0, y: 0 },
        "top-right": { x: window.innerWidth, y: 0 },
        "bottom-left": { x: 0, y: window.innerHeight },
        "bottom-right": { x: window.innerWidth, y: window.innerHeight },
        center: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
      };

      return positions[position];
    },
    [position]
  );

  const getClipPath = useCallback(
    (pos: { x: number; y: number }, radius: number) => {
      switch (variant) {
        case "circle":
        case "circle-blur":
          return `circle(${radius}px at ${pos.x}px ${pos.y}px)`;
        case "polygon":
          return radius === 0
            ? `polygon(${pos.x}px ${pos.y}px, ${pos.x}px ${pos.y}px, ${pos.x}px ${pos.y}px)`
            : `polygon(
                ${pos.x - radius}px ${pos.y - radius}px,
                ${pos.x + radius}px ${pos.y - radius}px,
                ${pos.x + radius}px ${pos.y + radius}px,
                ${pos.x - radius}px ${pos.y + radius}px
              )`;
        default:
          return `circle(${radius}px at ${pos.x}px ${pos.y}px)`;
      }
    },
    [variant]
  );

  const transitionTheme = useCallback(
    async (updateTheme: () => void | Promise<void>) => {
      // Fallback for browsers that don't support View Transitions
      if (!document.startViewTransition) {
        await updateTheme();
        return;
      }

      const pos = getPosition(triggerRef.current);
      const maxRadius = Math.hypot(
        Math.max(pos.x, window.innerWidth - pos.x),
        Math.max(pos.y, window.innerHeight - pos.y)
      );

      const transition = document.startViewTransition(async () => {
        await updateTheme();
      });

      transition.ready.then(() => {
        const clipPathStart = getClipPath(pos, 0);
        const clipPathEnd = getClipPath(pos, maxRadius);

        const filterStart =
          variant === "circle-blur" ? `blur(${blurAmount}px)` : "none";
        const filterEnd = "none";

        document.documentElement.animate(
          {
            clipPath: [clipPathStart, clipPathEnd],
            filter: [filterStart, filterEnd],
          },
          {
            duration,
            easing: "ease-out",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      });

      return transition.finished;
    },
    [getPosition, getClipPath, variant, duration, blurAmount]
  );

  return { transitionTheme, triggerRef };
}
