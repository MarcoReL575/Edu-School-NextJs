import z from "zod";

export const AssignGroupSchema = z.object({
    groupId: z.string().min(1, {message: '*Debes seleccinar algún grupo'}),
})

export type AssignGroupType = z.infer<typeof AssignGroupSchema>;

export const CreateGroupSchema = z.object({
    group: z.string().min(1, {message: '*Debes seleccinar algún grupo'}),
    grade: z.string().min(1, {message: '*Debes seleccionar algún grado'}),
    level:  z.string().min(1, {message: '*Debes seleccionar un nivel de estudios'}),
})

export const UpdateGroupSchema = CreateGroupSchema.extend({
    id: z.uuid(({ message: "ID inválido" }))
});
