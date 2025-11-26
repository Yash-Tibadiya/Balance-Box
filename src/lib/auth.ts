import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/drizzle/db";
import { nextCookies } from "better-auth/next-js";
import { config } from "@/config/config";

export const auth = betterAuth({
  socialProviders: {
    google: {
      clientId: config.googleClientId as string,
      clientSecret: config.googleClientSecret as string,
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 15, // 15 minutes
    },
  },
  plugins: [nextCookies()],
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
});
