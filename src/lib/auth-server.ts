import { headers } from "next/headers"
import { auth } from "./auth";
import { Role } from "../features/auth/types/auth-types";


export type Session = typeof auth.$Infer.Session;
export type FullSession = typeof auth.$Infer.Session & {
    user: {
        role: Role;
    }
};

export const getServerSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    return session
};

export async function requireAuth() {
    const session = await getServerSession();

    return {
        session: session as FullSession,
        isAuth: session? true : false
    }
}