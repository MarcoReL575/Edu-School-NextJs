import z from "zod";

export const CreateStudentSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, { message: '*El Nombre del estudiante es obligatorio' }),
    lastName: z.string().min(1, { message: '*El Apellido del estudiante es obligatorio' }),
    nivelEstudios: z.string().min(1, { message: '*Debes aignar el nivel de estudios al estudiante' }),
    inscrito: z.boolean(),
    groupId: z.string().min(1, { message: '*Debes asignarle un grupo al estudiante' })
})

export type CreateStudent = z.infer<typeof CreateStudentSchema>

export const EditStudentSchema = CreateStudentSchema.extend({
    id: z.uuid(({ message: "ID inválido" }))
})
