
import { InsertExamWithQuestions } from "../types/types";
import { examRepository, IExamRepository } from "./examRepository";

class ExamService {
    constructor(
        private examRepository: IExamRepository
    ){}

    async createExam(data: InsertExamWithQuestions) {
        try {
            await examRepository.createExamTransaction(data);
            return { success: true, message:'Examen creado' }
        } catch (error) {
            return { success: false, message:'Hubo un error, intenta de nuevo' }
        }
    }

    async getExams(teacherId: string) {
        return await examRepository.selectExams(teacherId);
    }

    async getStudentsExamsList(studentId: string, groupId: string) {
        return await examRepository.selectExamListStudents(studentId, groupId)
    }
}

export const examService = new ExamService(examRepository);