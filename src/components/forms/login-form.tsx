"use client";

import { useState } from "react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
// import { signIn } from "@/server/users";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SvgBlackGoogleIcon } from "../icons/Icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import Image from "next/image";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  // const [dots, setDots] = useState("");
  const router = useRouter();

  // useEffect(() => {
  //   if (isLoading) {
  //     const interval = setInterval(() => {
  //       setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
  //     }, 250);
  //     return () => clearInterval(interval);
  //   } else {
  //     setDots("");
  //   }
  // }, [isLoading]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signInWithGoogle = async () => {
    setIsGoogleLoading(true);
    toast.info("Redirecting to Google...");
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
    setIsGoogleLoading(false);
  };

  // async function onSubmit(values: z.infer<typeof formSchema>) {
  //   setIsLoading(true);
  //   const { success, message } = await signIn(values.email, values.password);

  //   if (success) {
  //     router.push("/dashboard");
  //     toast.success(String(message));
  //   } else {
  //     toast.error(String(message));
  //   }
  //   setIsLoading(false);
  // }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            {/* <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8"> */}
            <form
              onSubmit={form.handleSubmit(() => {
                console.log("hi");
              })}
              className="p-6 md:p-8"
            >
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-muted-foreground text-balance">
                    Login to your Acme Inc account
                  </p>
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="m@example.com"
                            {...field}
                            required
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    "Login"
                  )}

                  {/* {isLoading ? `Login${dots}` : "Login"} */}
                </Button>
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
                        {/* <SvgGoogleIcon /> */}
                        <SvgBlackGoogleIcon className="dark:invert" />
                        <span>Login with Google</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
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
