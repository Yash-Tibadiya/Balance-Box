"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/ui/phone-input";
import { LoaderCircle, Building2, MapPin } from "lucide-react";
import { updateCurrentUserBusinessInfo } from "@/models/users-actions";
import { useEvent } from "@/hooks/use-event";

export function BusinessInfoForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { sendEvent } = useEvent();

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

      // Track business info submitted event
      sendEvent("business_info_submitted", {
        businessName: formData.businessName,
        phone: formData.phone,
        businessAddress: formData.businessAddress,
        businessCity: formData.businessCity,
        businessState: formData.businessState,
        businessCountry: formData.businessCountry,
        businessZip: formData.businessZip,
      });

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
    "bg-background dark:bg-neutral-800/50 border-input dark:border-neutral-700 text-foreground dark:text-white placeholder:text-muted-foreground focus:border-ring focus:ring-ring h-10 rounded-lg text-sm";
  const labelClassName =
    "text-xs font-medium tracking-wider ml-1 text-foreground";

  return (
    <div
      className={cn(
        "flex flex-col justify-center min-h-full w-full max-w-sm mx-auto px-4 py-8 gap-6",
        className
      )}
      {...props}
    >
      <div className="flex flex-col items-center text-center space-y-1">
        <h1 className="text-xl font-bold text-foreground">Business Details</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="businessName" className={labelClassName}>
            Business Name
          </Label>
          <InputGroup className="bg-background dark:bg-neutral-800/50 border-input dark:border-neutral-700 h-10 rounded-lg">
            <InputGroupInput
              id="businessName"
              type="text"
              required
              placeholder="Your Business Name"
              value={formData.businessName}
              onChange={(e) => handleChange("businessName", e.target.value)}
              className="text-foreground dark:text-white placeholder:text-muted-foreground"
            />
            <InputGroupAddon>
              <Building2 className="size-4" />
            </InputGroupAddon>
          </InputGroup>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="phone" className={labelClassName}>
            Phone Number
          </Label>
          <PhoneInput
            id="phone"
            required
            placeholder="+91 1234567890"
            value={formData.phone}
            onChange={(value) => handleChange("phone", value || "")}
            defaultCountry="IN"
            international
            className={inputClassName}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="businessAddress" className={labelClassName}>
            Business Address
          </Label>
          <InputGroup className="bg-background dark:bg-neutral-800/50 border-input dark:border-neutral-700 h-10 rounded-lg">
            <InputGroupInput
              id="businessAddress"
              type="text"
              required
              placeholder="Street Address"
              value={formData.businessAddress}
              onChange={(e) => handleChange("businessAddress", e.target.value)}
              className="text-foreground dark:text-white placeholder:text-muted-foreground"
            />
            <InputGroupAddon>
              <MapPin className="size-4" />
            </InputGroupAddon>
          </InputGroup>
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
          variant="default"
          type="submit"
          className="w-full font-semibold h-10 rounded-lg transition-colors mt-2"
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
