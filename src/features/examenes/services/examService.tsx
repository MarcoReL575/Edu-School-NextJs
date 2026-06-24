
import { IStudentsRepository, studentsRepository } from "../../clases/services/StudentsRepository";
import { InsertExamWithQuestions, SubmitExam } from "../types/types";
import { examRepository, IExamRepository } from "./examRepository";

class ExamService {
    constructor(
        private examRepository: IExamRepository,
        private studentRepository: IStudentsRepository
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

    async getExamBySlug(examSlug: string) {
        return await examRepository.selectExam(examSlug);
    }

    async submitExamStudent(examinfo: SubmitExam, userId: string) {
        const { examId, examSlug, answers } = examinfo
        const student = await this.studentRepository.selectStudentByUserId(userId);
        try {
            const examData = await examRepository.selectExamWithAnswers(examSlug);
            if(!examData)  return { success: false, message: "El examen solicitado no existe." };

            //Verificamos que el alumno haya entregado el examen
            const existSubmission = await examRepository.submittedExam(examData.id, student.id);

            if (existSubmission && existSubmission.status === 'entregado') {
                return { success: false, message: "Ya has enviado tus respuestas para este examen anteriormente." };
            }

            // 🌟 2. Algoritmo de Calificación Automática
            let totalPointsPossible = 0;
            let pointsEarned = 0;

            for (const question of examData.questions) {
                totalPointsPossible += question.points;

                // Obtener el ID de la opción que seleccionó el alumno para esta pregunta
                const studentSelectedOptionId = answers[question.id];

                // Encontrar cuál es la opción correcta en la base de datos para esta pregunta
                const correctOption = question.options.find((option) => option.isCorrect);

                // Si el alumno respondió y coincide con la correcta, se le suman los puntos
                if (studentSelectedOptionId && correctOption && studentSelectedOptionId === correctOption.id) {
                    pointsEarned += question.points;
                }
            }

            // Calcular la nota final en base a una escala de 0 a 100
            const finalScore = totalPointsPossible > 0 
            ? parseFloat(((pointsEarned / totalPointsPossible) * 100).toFixed(2))
            : 0;

            await this.examRepository.submitExam(examData, finalScore, student.id);
            return {
                success: true,
                message: "¡Examen entregado con éxito!",
            };
        } catch (error) {
            return {
                success: false,
                message: "Error al engtregar examen",
            };
        }
    }
}

export const examService = new ExamService(examRepository, studentsRepository);