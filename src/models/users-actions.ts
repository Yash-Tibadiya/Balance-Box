"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { hasBusinessInfo } from "./users";

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
