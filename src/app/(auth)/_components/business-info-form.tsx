"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "../../../components/ui/button";
import { updateCurrentUserBusinessInfo } from "@/models/users-actions";

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
      const result = await updateCurrentUserBusinessInfo(formData);

      if (!result.success) {
        setError(result.error || "Failed to save business information");
        toast.error(result.error || "Failed to save business information");
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

  const inputClassName =
    "bg-neutral-800/50 border-neutral-700 text-white placeholder:text-neutral-500 focus:border-neutral-500 focus:ring-neutral-500 h-10 rounded-lg text-sm";
  const labelClassName =
    "text-white text-xs font-medium uppercase tracking-wider text-neutral-400 ml-1";

  return (
    <div
      className={cn(
        "flex flex-col justify-center min-h-full w-full max-w-sm mx-auto px-4 py-8 gap-6",
        className
      )}
      {...props}
    >
      <div className="flex flex-col items-center text-center space-y-1">
        <h1 className="text-lg font-bold text-white">Business Details</h1>
        <p className="text-neutral-400 text-xs">
          Please enter your business information below
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="businessName" className={labelClassName}>
            Business Name
          </Label>
          <Input
            id="businessName"
            type="text"
            required
            placeholder="Your Business Name"
            value={formData.businessName}
            onChange={(e) => handleChange("businessName", e.target.value)}
            className={inputClassName}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="phone" className={labelClassName}>
            Phone Number
          </Label>
          <Input
            id="phone"
            type="tel"
            required
            placeholder="+1234567890"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className={inputClassName}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="businessAddress" className={labelClassName}>
            Business Address
          </Label>
          <Input
            id="businessAddress"
            type="text"
            required
            placeholder="Street Address"
            value={formData.businessAddress}
            onChange={(e) => handleChange("businessAddress", e.target.value)}
            className={inputClassName}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="businessCity" className={labelClassName}>
              City
            </Label>
            <Input
              id="businessCity"
              type="text"
              required
              placeholder="City"
              value={formData.businessCity}
              onChange={(e) => handleChange("businessCity", e.target.value)}
              className={inputClassName}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="businessState" className={labelClassName}>
              State
            </Label>
            <Input
              id="businessState"
              type="text"
              required
              placeholder="State"
              value={formData.businessState}
              onChange={(e) => handleChange("businessState", e.target.value)}
              className={inputClassName}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="businessCountry" className={labelClassName}>
              Country
            </Label>
            <Input
              id="businessCountry"
              type="text"
              required
              placeholder="Country"
              value={formData.businessCountry}
              onChange={(e) => handleChange("businessCountry", e.target.value)}
              className={inputClassName}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="businessZip" className={labelClassName}>
              ZIP Code
            </Label>
            <Input
              id="businessZip"
              type="text"
              required
              placeholder="ZIP Code"
              value={formData.businessZip}
              onChange={(e) => handleChange("businessZip", e.target.value)}
              className={inputClassName}
            />
          </div>
        </div>

        {error && <div className="text-red-400 text-sm">{error}</div>}

        <Button
          variant="secondary"
          type="submit"
          className="w-full bg-white hover:bg-neutral-200 text-black font-semibold h-10 rounded-lg transition-colors mt-2"
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
  );
}
