import { cn } from "@/lib/utils";
import { Header } from "./_components/header";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="max-w-screen overflow-x-hidden px-2">{children}</main>
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
