import z from "zod";

export const CreateClasesSchema = z.object({
    groupId: z.string().min(1, {message: '*Debes seleccinar algún grupo'}),
    subjectId: z.string().min(1, {message: '*Debes asignar una materia a esta clase'}),
    teacherId:  z.string().min(1, {message: '*Debes asignar un maetsro para esta clase'}),
})


export const CreateHorarioSchema = z.object({
    dayOfWeek: z.enum(['lunes', 'martes', 'miercoles', 'jueves', 'viernes'], { error: '*Debes seleccinar un día'}),
    startTime: z.string().min(1, {message: '*Debes asignar una hora de incio'}),
    endTime:  z.string().min(1, {message: '*Debes asignar la hora en que termina la clase'}),
    claseId: z.string().min(5,{message: '*Debes asignar la materia'})
})

export const HorarioSchema = CreateHorarioSchema.extend({
    id: z.uuid(({ message: "ID inválido" }))
});

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

