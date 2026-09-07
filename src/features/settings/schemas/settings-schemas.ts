import * as z from 'zod'

export const UpdateProfileSchema = z.object({
    name: z.string().min(1, { error: '*El nombre no puede ir vacío' }),
    lastName: z.string().min(1, { error: '*El apellido no puede ir vacío' }),
    email: z.email({ error: '*Ingresa un correo válido' }),
    currentPassword: z.string().optional().or(z.literal('')),
    newPassword: z.string().optional().or(z.literal('')),
    confirmNewPassword: z.string().optional().or(z.literal('')),
}).refine((data) => !data.newPassword || data.newPassword.length >= 4, {
    error: '*La nueva contraseña debe tener al menos 4 caracteres',
    path: ['newPassword'],
}).refine((data) => !data.newPassword || data.newPassword === data.confirmNewPassword, {
    error: '*Las contraseñas no coinciden',
    path: ['confirmNewPassword'],
}).refine((data) => !data.newPassword || !!data.currentPassword, {
    error: '*Ingresa tu contraseña actual para poder cambiarla',
    path: ['currentPassword'],
})

export type UpdateProfileProps = z.infer<typeof UpdateProfileSchema>

export const ChildMatriculaSchema = z.object({
    matricula: z.string().min(1, { error: '*La matrícula no puede ir vacía' }),
})

export type ChildMatriculaProps = z.infer<typeof ChildMatriculaSchema>
