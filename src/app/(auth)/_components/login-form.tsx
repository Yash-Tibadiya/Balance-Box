"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { SvgBlackGoogleIcon } from "../../../components/icons/Icons";
import { Card, CardContent } from "@/components/ui/card";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import Image from "next/image";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Button } from "../../../components/ui/button";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [stage, setStage] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const otpSlotClassName = cn(
    "dark:bg-neutral-800/50 dark:border-neutral-700 dark:text-white",
    "bg-neutral-800/50 border-neutral-700 text-white",
    "data-[active=true]:border-neutral-600 data-[active=true]:ring-neutral-600/50"
  );

  const requestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    const { error } = await authClient.emailOtp.sendVerificationOtp({
      email,
      type: "sign-in",
    });

    if (error) {
      setError(error.message || "Failed to send OTP");
      toast.error(error.message || "Failed to send OTP");
    } else {
      toast.success("Login code sent to your email");
      setStage("otp");
    }
    setLoading(false);
  };

  const verifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await authClient.signIn.emailOtp({
      email,
      otp: code,
    });

    if (error) {
      setError(error.message || "Invalid code");
      toast.error(error.message || "Invalid code");
    } else {
      toast.success("Logged in successfully");
      router.push("/business-info");
    }
    setLoading(false);
  };

  const signInWithGoogle = async () => {
    setIsGoogleLoading(true);
    toast.info("Redirecting to Google...");
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/business-info",
    });
    setIsGoogleLoading(false);
  };

  const resetToEmail = () => {
    setStage("email");
    setCode("");
    setError(null);
  };

  return (
    <div className="flex flex-col min-h-full w-full max-w-md mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12">
      <div className="flex flex-col gap-6 flex-1">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Welcome back
          </h1>
          <p className="text-sm md:text-base text-white/70 text-balance">
            Login to your Balance Box account
          </p>
        </div>

        {stage === "email" ? (
          <form onSubmit={requestOtp} className="grid gap-6">
            <Field>
              <FieldLabel
                htmlFor="email"
                className="text-white text-sm font-medium"
              >
                Email
              </FieldLabel>
              <Input
                id="email"
                type="email"
                required
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-neutral-800/50 border-neutral-700 text-white placeholder:text-neutral-400 focus:border-neutral-600 focus:ring-neutral-600 h-11 rounded-lg"
              />
              {error && (
                <FieldError className="text-red-400">{error}</FieldError>
              )}
            </Field>
            <Button
              variant="secondary"
              type="submit"
              className="w-full bg-neutral-200 hover:bg-neutral-300 text-neutral-900 font-medium h-11 rounded-lg transition-colors"
              disabled={loading || !email}
            >
              {loading ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : (
                "Send Login Code"
              )}
            </Button>
          </form>
        ) : (
          <form onSubmit={verifyCode} className="grid gap-6">
            <Field>
              <FieldLabel className="text-white text-sm font-medium">
                6-digit code
              </FieldLabel>
              <InputOTP
                maxLength={6}
                value={code}
                onChange={(v) => setCode(v.replace(/\D/g, ""))}
                containerClassName="justify-center"
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} className={otpSlotClassName} />
                  <InputOTPSlot index={1} className={otpSlotClassName} />
                  <InputOTPSlot index={2} className={otpSlotClassName} />
                  <InputOTPSlot index={3} className={otpSlotClassName} />
                  <InputOTPSlot index={4} className={otpSlotClassName} />
                  <InputOTPSlot index={5} className={otpSlotClassName} />
                </InputOTPGroup>
              </InputOTP>
              {error && (
                <FieldError className="text-red-400">{error}</FieldError>
              )}
            </Field>
            <Button
              variant="secondary"
              type="submit"
              className="w-full bg-neutral-200 hover:bg-neutral-300 text-neutral-900 font-medium h-11 rounded-lg transition-colors"
              disabled={loading || code.length !== 6}
            >
              {loading ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : (
                "Verify and Login"
              )}
            </Button>
            <div className="text-center text-sm text-white/70">
              Use a different{" "}
              <button
                type="button"
                onClick={resetToEmail}
                className="underline underline-offset-2 text-white font-medium hover:text-white/80"
              >
                Email
              </button>
            </div>
          </form>
        )}

        <div className="relative flex items-center gap-4 my-2">
          <div className="flex-1 border-t border-neutral-700"></div>
          <span className="text-sm text-white/60 px-2">Or continue with</span>
          <div className="flex-1 border-t border-neutral-700"></div>
        </div>

        <div>
          <Button
            variant="outline"
            type="button"
            className="w-full bg-neutral-800/50 hover:bg-neutral-700/50 border-neutral-700 text-white font-medium h-11 rounded-lg transition-colors"
            onClick={signInWithGoogle}
            disabled={isGoogleLoading}
          >
            {isGoogleLoading ? (
              <LoaderCircle className="animate-spin size-4" />
            ) : (
              <>
                <SvgBlackGoogleIcon className="dark:invert size-5" />
                <span>Login with Google</span>
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="text-white/50 text-center text-xs text-balance mt-8 pt-6 border-t border-neutral-800">
        By clicking continue, you agree to our{" "}
        <Link
          href="/"
          className="underline underline-offset-2 hover:text-white/70 transition-colors"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="/"
          className="underline underline-offset-2 hover:text-white/70 transition-colors"
        >
          Privacy Policy
        </Link>
        .
      </div>
    </div>
  );
}
