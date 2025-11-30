import { db } from "@/drizzle/db";
import { user } from "@/drizzle/schemas/auth-schema";
import { eq } from "drizzle-orm";

export interface BusinessInfo {
  businessName: string;
  phone: string;
  businessAddress: string;
  businessCity: string;
  businessState: string;
  businessCountry: string;
  businessZip: string;
}

export interface UpdateBusinessInfoParams extends BusinessInfo {
  userId: string;
}

/**
 * Check if user has completed business info
 */
export async function hasBusinessInfo(userId: string): Promise<boolean> {
  const [userData] = await db
    .select({
      businessName: user.businessName,
      phone: user.phone,
      businessAddress: user.businessAddress,
      businessCity: user.businessCity,
      businessState: user.businessState,
      businessCountry: user.businessCountry,
      businessZip: user.businessZip,
    })
    .from(user)
    .where(eq(user.id, userId))
    .limit(1);

  if (!userData) {
    return false;
  }

  return !!(
    userData.businessName &&
    userData.phone &&
    userData.businessAddress &&
    userData.businessCity &&
    userData.businessState &&
    userData.businessCountry &&
    userData.businessZip
  );
}

/**
 * Update user business information
 */
export async function updateBusinessInfo(
  params: UpdateBusinessInfoParams
): Promise<void> {
  const { userId, ...businessInfo } = params;

  await db
    .update(user)
    .set({
      phone: businessInfo.phone,
      businessName: businessInfo.businessName,
      businessAddress: businessInfo.businessAddress,
      businessCity: businessInfo.businessCity,
      businessState: businessInfo.businessState,
      businessCountry: businessInfo.businessCountry,
      businessZip: businessInfo.businessZip,
      updatedAt: new Date(),
    })
    .where(eq(user.id, userId));
}

/**
 * Get user by ID
 */
export async function getUserById(userId: string) {
  const [userData] = await db
    .select()
    .from(user)
    .where(eq(user.id, userId))
    .limit(1);

  return userData;
}

