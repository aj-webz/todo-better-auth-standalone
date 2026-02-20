import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { user, session, account, getDb } from "@repo/db";
import { expo } from "@better-auth/expo"

export const auth = betterAuth({
  database: drizzleAdapter(getDb(), {
    provider: "pg",
    schema: {
      user,
      session,
      account,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://todo-better-auth-standalone-server-sage.vercel.app", 
    "https://todo-better-auth-standalone-web.vercel.app",
    "my-expo-app://"
  ],
  advanced: {
    crossOriginCookies: true,
    trustedProxyHeaders: true,
    defaultCookieAttributes: {
      sameSite: "none",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    },
  },
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL!,
});