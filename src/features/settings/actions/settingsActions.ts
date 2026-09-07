'use server'

import { revalidatePath } from "next/cache";
import { requireAuth } from "@/src/lib/auth-server";
import { settingsService } from "../services/SettingsService";
import { studentsService } from "../../students/services/StudentsService";
import { parentsService } from "../../parents/services/ParentsService";
import { UpdateProfileProps, UpdateProfileSchema, ChildMatriculaProps, ChildMatriculaSchema } from "../schemas/settings-schemas";

export async function getMyProfileAction() {
    const { session, isAuth } = await requireAuth();
    if (!isAuth) return undefined;

    return await settingsService.getProfile(session.user.id);
}

export async function updateProfileAction(data: UpdateProfileProps) {
    const { session, isAuth } = await requireAuth();
    if (!isAuth) return { success: false, message: 'No autorizado' }

    const { success: validated, data: parsed, error } = UpdateProfileSchema.safeParse(data);
    if (!validated) return { success: false, message: error.issues[0]?.message ?? 'Datos inválidos' }

    const result = await settingsService.updateProfile(session.user.id, session.user.email, parsed);
    if (result.success) revalidatePath('/dashboard/ajustes');

    return result;
}

export async function addChildMatriculaAction(data: ChildMatriculaProps) {
    const { session, isAuth } = await requireAuth();
    if (!isAuth || session.user.role !== 'tutor') return { success: false, message: 'No autorizado' }

    const { success: validated, data: parsed, error } = ChildMatriculaSchema.safeParse(data);
    if (!validated) return { success: false, message: error.issues[0]?.message ?? 'Datos inválidos' }

    const parent = await parentsService.getParentByUserId(session.user.id);
    if (!parent) return { success: false, message: 'No se encontró tu información de tutor' }

    const student = await studentsService.getStudentByMatricula(parsed.matricula);
    if (!student || !student.inscrito) return { success: false, message: 'No existe un estudiante inscrito con esa matrícula' }

    const result = await parentsService.linkChild(parent.id, student.id);
    if (result.success) revalidatePath('/dashboard/ajustes');

    return result;
}

export async function updateChildMatriculaAction(oldStudentId: string, data: ChildMatriculaProps) {
    const { session, isAuth } = await requireAuth();
    if (!isAuth || session.user.role !== 'tutor') return { success: false, message: 'No autorizado' }

    const { success: validated, data: parsed, error } = ChildMatriculaSchema.safeParse(data);
    if (!validated) return { success: false, message: error.issues[0]?.message ?? 'Datos inválidos' }

    const parent = await parentsService.getParentByUserId(session.user.id);
    if (!parent) return { success: false, message: 'No se encontró tu información de tutor' }

    const student = await studentsService.getStudentByMatricula(parsed.matricula);
    if (!student || !student.inscrito) return { success: false, message: 'No existe un estudiante inscrito con esa matrícula' }

    const result = await parentsService.replaceChild(parent.id, oldStudentId, student.id);
    if (result.success) revalidatePath('/dashboard/ajustes');

    return result;
}

export async function getTutorChildrenForSettingsAction() {
    const { session, isAuth } = await requireAuth();
    if (!isAuth || session.user.role !== 'tutor') return [];

    return await parentsService.getChildrenByUserId(session.user.id);
}
