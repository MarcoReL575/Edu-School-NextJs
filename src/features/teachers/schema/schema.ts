import z from "zod";

export const NewTeacherSchema = z.object({
    name: z.string().min(1, { message: "El nombre es obligatorio" }),
    lastName: z.string().min(1, { message: "El apellido es obligatorio" }),
    level: z.string().min(1, { message: "El nivel es obligatorio" }),
    slug: z.string().min(1, "El slug es obligatorio"),
})
