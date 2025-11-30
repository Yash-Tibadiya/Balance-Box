import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/drizzle/db";
import { nextCookies } from "better-auth/next-js";
import { emailOTP } from "better-auth/plugins";
import { config } from "@/config/config";
import { Resend } from "resend";

const resend = new Resend(config.resendApiKey);

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
  plugins: [
    nextCookies(),
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        const subject =
          type === "sign-in"
            ? "Your Login Code"
            : type === "email-verification"
            ? "Verify Your Email"
            : "Reset Your Password";

        await resend.emails.send({
          from: `${config.emailSenderName} <${config.emailSenderAddress}>`,
          to: email,
          subject,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>${subject}</h2>
              <p>Your verification code is:</p>
              <div style="background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 8px; margin: 20px 0;">
                ${otp}
              </div>
              <p>This code will expire in 5 minutes.</p>
              <p>If you didn't request this code, please ignore this email.</p>
            </div>
          `,
        });
      },
    }),
  ],
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
});
