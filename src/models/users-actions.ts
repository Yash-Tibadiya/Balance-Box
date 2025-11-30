"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import {
  hasBusinessInfo,
  updateBusinessInfo,
  type BusinessInfo,
} from "./users";

/**
 * Server action: Check if current user has completed business info
 * This can be called from client components
 */
export async function checkCurrentUserBusinessInfo(): Promise<boolean> {
  try {
    const headersList = await headers();
    const session = await auth.api.getSession({
      headers: headersList,
    });

    if (!session?.user) {
      return false;
    }

    return await hasBusinessInfo(session.user.id);
  } catch (error) {
    console.error("Error checking business info:", error);
    return false;
  }
}

/**
 * Server action: Update current user's business information
 * This can be called from client components
 */
export async function updateCurrentUserBusinessInfo(
  businessInfo: BusinessInfo
): Promise<{ success: boolean; error?: string }> {
  try {
    const headersList = await headers();
    const session = await auth.api.getSession({
      headers: headersList,
    });

    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    // Validate required fields
    if (
      !businessInfo.businessName ||
      !businessInfo.phone ||
      !businessInfo.businessAddress ||
      !businessInfo.businessCity ||
      !businessInfo.businessState ||
      !businessInfo.businessCountry ||
      !businessInfo.businessZip
    ) {
      return { success: false, error: "All fields are required" };
    }

    await updateBusinessInfo({
      userId: session.user.id,
      ...businessInfo,
    });

    return { success: true };
  } catch (error) {
    console.error("Error updating business info:", error);
    return {
      success: false,
      error: "Failed to update business information",
    };
  }
}
