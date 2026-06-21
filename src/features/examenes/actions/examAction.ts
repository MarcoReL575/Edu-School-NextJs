'use server'

import { requireAuth } from "@/src/lib/auth-server";
import { InsertExamWithQuestions } from "../types/types";
import { examService } from "../services/examService";

export default async function createExamAction(data: InsertExamWithQuestions) {
    console.log('creando examen')
    const { session } = await requireAuth();
    if(session.user.role !== 'maestro') return { success: false, message: 'El usuario no tiene permisos para realizzar esta acción' }

    return await examService.createExam(data)
}