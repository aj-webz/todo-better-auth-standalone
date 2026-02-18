import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import dotenv from "dotenv";
dotenv.config({path:"../../.env"});
import {user,session,account,getDb}from "@repo/db"



export const auth = betterAuth(
    {
        database:drizzleAdapter(getDb(),{
            provider:"pg",
            schema:{
                user,
                session,
                account,
            }
        }),
        emailAndPassword:{
            enabled:true,
        },
        secret:process.env.BETTER_AUTH_SECRET!,
        baseURL:process.env.BETTER_AUTH_URL!,
    }
)