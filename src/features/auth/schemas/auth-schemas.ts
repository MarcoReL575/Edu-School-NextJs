
import * as z from 'zod';

export const SignUpSchema = z.object({
    role: z.enum(["admin", "maestro", "estudiante", "tutor"]),
    name: z.string().min(1, { error: '*El nombre no puede ir vacío' }),
    lastname: z.string().min(1, { error: '*El apellido no puede ir vacío' }),
    email: z.string().min(1, { error: '*El correo no puede ir vacío' }),
    password: z.string().min(4, { error: '*La contraseña no puede ir vacía' }),
    confirmPassword: z.string().min(1, { error: '*Debes confirmar la contraseña' }),
    roleId: z.string().min(1, { error: '*Este campo no puede ir vacío' })
}).refine((data)=> data.password === data.confirmPassword, {
    error: '*Las contraseñas no coinciden',
    path: ['confirmPassword']
})

export const SignInSchema = z.object({
    email: z.string().min(1, { error: '*El correo no puede ir vacío' }),
    password: z.string().min(4, { error: '*La contraseña no puede ir vacía' }),
})