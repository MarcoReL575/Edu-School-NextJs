'use server'

import { requireAuth } from "@/src/lib/auth-server";
import { InsertExamWithQuestions, SubmitExam } from "../types/types";
import { examService } from "../services/examService";

export async function createExamAction(data: InsertExamWithQuestions) {
    const { session } = await requireAuth();
    if(session.user.role !== 'maestro') return { success: false, message: 'El usuario no tiene permisos para realizzar esta acción' }

    return await examService.createExam(data)
}

export async function submitExamAction(examinfo: SubmitExam) {
    const { session } = await requireAuth();
    if(session.user.role !== 'estudiante') return { success: false, message: 'El usuario no tiene permisos para realizzar esta acción' }

    return examService.submitExamStudent(examinfo, session.user.id);
}