import { cn } from "@/lib/utils";

export function Footer() {
  return (
    <>
      <div className="max-w-screen overflow-x-hidden px-2">
        <div className="mx-auto border-x border-edge md:max-w-5xl">
          <div
            className={cn(
              "h-8 px-2",
              "screen-line-before",
              "after:absolute after:-left-[100vw] after:-z-1 after:h-full after:w-[200vw]",
              "after:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] after:bg-size-[10px_10px] after:[--pattern-foreground:var(--color-edge)]/56"
            )}
          />
        </div>
      </div>

      <div
        className={cn(
          "sticky top-0 z-50 max-w-screen overflow-x-hidden bg-background px-2 pb-2",
          "data-[affix=true]:shadow-[0_0_16px_0_black]/8 dark:data-[affix=true]:shadow-[0_0_16px_0_black]",
          "not-dark:data-[affix=true]:**:data-header-container:before:bg-border",
          "transition-shadow duration-300"
        )}
      >
        <div
          className="screen-line-before screen-line-after mx-auto flex h-12 items-center justify-between gap-2 border-x border-edge px-2 before:z-1 before:transition-[background-color] sm:gap-4 md:max-w-5xl"
          data-header-container
        ></div>
      </div>
    </>
  );
}
