"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Button } from "../ui/button";

export function BusinessInfoForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const [formData, setFormData] = useState({
    businessName: "",
    phone: "",
    businessAddress: "",
    businessCity: "",
    businessState: "",
    businessCountry: "",
    businessZip: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/user/business-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to save business information");
        toast.error(data.error || "Failed to save business information");
        setLoading(false);
        return;
      }

      toast.success("Business information saved successfully");
      router.push("/");
    } catch (err) {
      setError("An error occurred. Please try again.");
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Business Information</h1>
                <p className="text-muted-foreground text-balance">
                  Please provide your business details to continue
                </p>
              </div>

              <form onSubmit={handleSubmit} className="grid gap-6">
                <Field>
                  <FieldLabel htmlFor="businessName">Business Name</FieldLabel>
                  <Input
                    id="businessName"
                    type="text"
                    required
                    placeholder="Your Business Name"
                    value={formData.businessName}
                    onChange={(e) => handleChange("businessName", e.target.value)}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    placeholder="+1234567890"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="businessAddress">Business Address</FieldLabel>
                  <Input
                    id="businessAddress"
                    type="text"
                    required
                    placeholder="Street Address"
                    value={formData.businessAddress}
                    onChange={(e) => handleChange("businessAddress", e.target.value)}
                  />
                </Field>

                <div className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="businessCity">City</FieldLabel>
                    <Input
                      id="businessCity"
                      type="text"
                      required
                      placeholder="City"
                      value={formData.businessCity}
                      onChange={(e) => handleChange("businessCity", e.target.value)}
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="businessState">State</FieldLabel>
                    <Input
                      id="businessState"
                      type="text"
                      required
                      placeholder="State"
                      value={formData.businessState}
                      onChange={(e) => handleChange("businessState", e.target.value)}
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="businessCountry">Country</FieldLabel>
                    <Input
                      id="businessCountry"
                      type="text"
                      required
                      placeholder="Country"
                      value={formData.businessCountry}
                      onChange={(e) => handleChange("businessCountry", e.target.value)}
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="businessZip">ZIP Code</FieldLabel>
                    <Input
                      id="businessZip"
                      type="text"
                      required
                      placeholder="ZIP Code"
                      value={formData.businessZip}
                      onChange={(e) => handleChange("businessZip", e.target.value)}
                    />
                  </Field>
                </div>

                {error && <FieldError>{error}</FieldError>}

                <Button
                  variant="default"
                  type="submit"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <LoaderCircle className="size-4 animate-spin" />
                  ) : (
                    "Continue"
                  )}
                </Button>
              </form>
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
    </div>
  );
}

