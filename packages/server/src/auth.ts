import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });
import { user, session, account, getDb } from "@repo/db";
import { expo } from "@better-auth/expo"

if (!process.env.BETTER_AUTH_URL) {
  throw new Error("Not found Better auth");
}
if(!process.env.BETTER_AUTH_SECRET)
{
  throw new Error("Auth secret not found");
}

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
    "https://todo-better-auth-standalone-server.vercel.app",
     "https://todo-better-auth-standalone-web.vercel.app",
     "my-expo-app://"
  ],

  advanced: {
    crossOriginCookies: true,
    trustedProxyHeaders: true ,
    defaultCookieAttributes: {
      sameSite: "none", 
      //secure: true,     
      httpOnly: true,
    },
  },

  plugins:[expo()],

  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL!,
});
