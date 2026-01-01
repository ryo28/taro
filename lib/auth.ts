import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db"; // your drizzle instance
import { nanoid } from "nanoid";
import { baseUrl } from "./base-url";
import { anonymous } from "better-auth/plugins"
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
    baseURL:baseUrl(),
    database: drizzleAdapter(db, {
        provider: "pg",
        usePlural: true,
    }),
    advanced:{
        database:{
            generateId:() => nanoid(10)
        },
    },
    plugins:[anonymous(), nextCookies()]
});