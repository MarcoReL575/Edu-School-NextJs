import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins"
import { nextCookies } from "better-auth/next-js";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import * as authSchema from "../db/schema/auth-schema"

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
        schema: {
            ...authSchema
        }
    }),
    emailAndPassword: {
        enabled: true,
    },
    user: {
        additionalFields: {
            role: {
                type: 'string',
                defaultValue: 'estudiante'
            }
        }
    },
    plugins: [
        nextCookies(),
        admin()
    ],
});

export type Session = typeof auth.$Infer.Session;