import { LoginForm } from "@/components/forms/login-form";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
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
        <LoginForm />
      </div>
    </div>
  );
}
