'use server'

import { requireAuth } from "@/src/lib/auth-server";
import { clasesServices } from "../services/ClasesServices";
import { CreateClasesSchema, CreateHorarioSchema, HorarioSchema } from "../schema/clasesSchemas";
import { ClasesInsertType, HorariosInsertType, HorariosSelectType } from "../types/types";
import { subjectsService } from "../services/SubjectsService";

export async function getAllClasesAction() {
    return await clasesServices.getAllClasses();
}

export async function createClassAction(data: ClasesInsertType) {
    const { session } = await requireAuth()
    if(session?.user.role !== 'admin') return { success: false, message: 'El usuario no tiene los permisos necesarios' };

    const response = CreateClasesSchema.safeParse(data);
    if(!response.success) return { success: false, message: 'Error de validación' };

    const create = await clasesServices.createClass(response.data);
    return create
}

export async function createHorarioClaseAction(input: HorariosInsertType) {
    const { session } = await requireAuth()
    if(session?.user.role !== 'admin') return { success: false, message: 'El usuario no tiene los permisos necesarios' };

    const response = CreateHorarioSchema.safeParse(input);
    if(!response.success) return { success: false, message: 'Error de validación' };

    const create = await clasesServices.createHorario(response.data);
    return create
}


export async function editHorarioClaseAction(input: HorariosSelectType) {
    const { session } = await requireAuth()
    if(session?.user.role !== 'admin') return { success: false, message: 'El usuario no tiene los permisos necesarios' };

    const response = HorarioSchema.safeParse(input);
    if(!response.success) return { success: false, message: 'Error de validación' };

    await clasesServices.editHorario(response.data);
    return { success: true, message: 'El horario fue editado' };
}

export async function getStudentsSubjectsAction(groupId: string, studentId: string) {
    return await clasesServices.getClasesByStudents(groupId, studentId)
}

export async function deleteHorarioClaseAciton(claseId: string) {
    const { session } = await requireAuth()
    if(session?.user.role !== 'admin') return { success: false, message: 'El usuario no tiene los permisos necesarios' };

    await clasesServices.deleteHorarioClase(claseId)
    return { success:true, message:'El horario ha sido eliminado' }
}