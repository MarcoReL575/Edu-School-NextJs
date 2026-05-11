'use server'

import { SignInSchema, SignUpSchema } from "../schemas/auth-schemas";
import { authService } from "../services/AuthService";
import { SignInProps, SignUpProps } from "../types/auth-types";


export async function createAccountAction(data: SignUpProps) {
    const response = SignUpSchema.safeParse(data);
    if(!response.success) return { success: false, message: '*Error en validación' }
    console.log(response.data)

    const createAccount = await authService.createAccount(response.data);
    return createAccount;
}

export async function SignInAction(data: SignInProps) {
    console.log(data)
    const response = SignInSchema.safeParse(data);
    if(!response.success) return { success: false, message: '*Error de validación' }

    const signin = await authService.login(response.data);
    return signin;
}

export async function SignUpAction(data: SignUpProps) {
    const response = SignUpSchema.safeParse(data);
    if(!response.success) return { success: false, message: '*Error de validación' }

    const signUp = await authService.signUp(data);
    return signUp
}

export async function SignOutAction() {
    await authService.signOut();
}