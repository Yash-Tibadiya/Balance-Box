import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const Home = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="flex flex-col items-center gap-6">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        {/* TODO: Add name and Logo */}
        <h1 className="text-4xl font-bold">Welcome to Balance Box</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Sign in to your account to continue
        </p>
        <Link href="/login">
          <Button size="lg">Go to Login</Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
