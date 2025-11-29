"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { SvgBlackGoogleIcon } from "../icons/Icons";
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
import { Button } from "../ui/button";

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
      router.push("/");
    }
    setLoading(false);
  };

  const signInWithGoogle = async () => {
    setIsGoogleLoading(true);
    toast.info("Redirecting to Google...");
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
    setIsGoogleLoading(false);
  };

  const resetToEmail = () => {
    setStage("email");
    setCode("");
    setError(null);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                {/* TODO: Add name and Logo */}
                <p className="text-muted-foreground text-balance">
                  Login to your Balance Box account
                </p>
              </div>

              {stage === "email" ? (
                <form onSubmit={requestOtp} className="grid gap-6">
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="m@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {error && <FieldError>{error}</FieldError>}
                  </Field>
                  <Button
                    variant="default"
                    type="submit"
                    className="w-full"
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
                    <FieldLabel>6-digit code</FieldLabel>
                    <InputOTP
                      maxLength={6}
                      value={code}
                      onChange={(v) => setCode(v.replace(/\D/g, ""))}
                      containerClassName="justify-start"
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                    {error && <FieldError>{error}</FieldError>}
                  </Field>
                  <Button
                    variant="default"
                    type="submit"
                    className="w-full"
                    disabled={loading || code.length !== 6}
                  >
                    {loading ? (
                      <LoaderCircle className="size-4 animate-spin" />
                    ) : (
                      "Verify and Login"
                    )}
                  </Button>
                  <div className="text-center text-sm">
                    Use a different{" "}
                    <button
                      type="button"
                      onClick={resetToEmail}
                      className="underline underline-offset-2 text-green-750 font-medium"
                    >
                      Email
                    </button>
                  </div>
                </form>
              )}

              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <div className="">
                <Button
                  variant="outline"
                  type="button"
                  className="w-full"
                  onClick={signInWithGoogle}
                  disabled={isGoogleLoading}
                >
                  {isGoogleLoading ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    <>
                      <SvgBlackGoogleIcon className="dark:invert" />
                      <span>Login with Google</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
          <div className="bg-muted relative hidden md:block">
            <Image
              src="/images/login_img_2.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.9] dark:grayscale"
              fill
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our{" "}
        <Link href="/">Terms of Service</Link> and{" "}
        <Link href="/">Privacy Policy</Link>.
      </div>
    </div>
  );
}
