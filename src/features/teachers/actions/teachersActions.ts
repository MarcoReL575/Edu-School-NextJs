'use server'

import { requireAuth } from "@/src/lib/auth-server";
import { teacherService } from "../services/teacherService";
import { TeachersClases, TeachersInsertType, TeachersSelectType } from "../types/types";

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

export async function getTeachersListAction() {
    const { session } = await requireAuth();
    if(!session || session.user.role !== 'admin') return { success: false, message: '', teachers: [] as TeachersSelectType[] }

    return await teacherService.getAllTechaersList();
}

export async function addNewTeacherAction(infoTeacher: TeachersInsertType) {
    const { session } = await requireAuth();
    if(session.user.role !== 'admin') return { success: false, message: 'El usuario no cuenta con los permisso necesarios' } 

    return teacherService.createNewTeacher(infoTeacher);
}

export async function editInfoTeacherAction(infoTeacher: TeachersInsertType, slugOld: string) {
    console.log(infoTeacher)
    const { session } = await requireAuth();
    if(session.user.role !== 'admin') return { success: false, message: 'El usuario no cuenta con los permisso necesarios' } 

    return teacherService.updateInfoTeacher(infoTeacher, slugOld);
}