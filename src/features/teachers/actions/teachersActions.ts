'use server'

import { requireAuth } from "@/src/lib/auth-server";
import { teacherService } from "../clases/teacherService";
import { TeachersClases, TeachersSelectType } from "../types/types";

export async function getInfoTeachersClases(claseId: string) {
    const clases = await teacherService.getAllInfoClase(claseId);
    return clases
}

export async function getTeachersSubjectsAction() {

    const { session } = await requireAuth();
    const {teacher} = await teacherService.getTeacherByUserId(session.user.id);

    if(!teacher || !teacher.userId) return  { success: false, message: 'El maestro no existe', clases: [] as TeachersClases[] };
    return await teacherService.getTeachersClases(teacher.id);
}