'use server'

import { requireAuth } from "@/src/lib/auth-server";
import { studentsService } from "../services/StudentsService";
import { CreateStudent, CreateStudentSchema, EditStudentSchema } from "../schema/clasesSchemas";
import { StudentsInsertType, StudentsSelectType, StudentsTable } from "../types/types";

export async function getListStudentsAction() {
    const { session } = await requireAuth();
    if(session?.user.role !== 'admin') return [];

    const students = await studentsService.getAllStudents();
    return students
};

export async function createStudentAction(student: CreateStudent) {
    const { session } = await requireAuth();
    if(session.user.role !== 'admin') return { success: false, message: '*El usuario no cuenta con los permisos necesarios' }

    const response = CreateStudentSchema.safeParse(student);
    if(!response.success) return { success: false, message: '*Error de validación' }

    await studentsService.createStudent(student);
    return { success: true, message: 'Estudiante inscrito' }
}

export async function editStudentAction(student: StudentsInsertType) {
    const { session } = await requireAuth();
    if(session.user.role !== 'admin') return { success: false, message: '*El usuario no cuenta con los permisos necesarios' }

    const response = EditStudentSchema.safeParse(student);
    if(!response.success) return { success: false, message: '*Error de validación' }

    await studentsService.editStudent(response.data)
    return { success: true, message: 'Estudiante actualizado' }
}

export async function deleteStudentAction(studentId: string) {
    const { session } = await requireAuth();
    if(session.user.role !== 'admin') return { success: false, message: '*El usuario no cuenta con los permisos necesarios' }

    await studentsService.delteStudent(studentId);
    return { success: true, message:'El estudiante fue eliminado' }
}