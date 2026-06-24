
import { IStudentsRepository, studentsRepository } from "../../clases/services/StudentsRepository";
import { INotificationRepository, notificationRepository } from "../../notifications/services/notificationRepository";
import { ITeacherRepository, teacherRepository } from "../../teachers/clases/teacherRepository";
import { InsertExamWithQuestions, StudentExamRender, StudentsSubmissions, SubmitExam } from "../types/types";
import { examRepository, IExamRepository } from "./examRepository";

class ExamService {
    constructor(
        private examRepository: IExamRepository,
        private studentsRepository: IStudentsRepository,
        private notificationRepository: INotificationRepository,
        private teacherRepository: ITeacherRepository,
    ){}

    async createExam(data: InsertExamWithQuestions) {
        try {
            await examRepository.createExamTransaction(data);
            const listStudents = await this.studentsRepository.selectStudentsInGroup(data.groupId);
            if(listStudents.length > 0) {
                const notificationsPayload = listStudents.filter((student)=> student.user_id !== null).map((student)=>({
                    userId: student.user_id as string,
                        title: `Examen creado: ${data.subjectName}`,
                        message: `Nuevo Examen: ${data.title}` ,
                        type: 'task_created' as const ,
                        isRead: false,
                        redirectUrl: '/dashboard/examenes',
                    }))
                    // Insertamos todas las notificaciones en un solo query a la base de datos
                    if(notificationsPayload.length > 0) {
                        await this.notificationRepository.insertMany(notificationsPayload);
                    }
                }
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
        const student = await this.studentsRepository.selectStudentByUserId(userId);
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

    async deleteExam(examId: string, userId: string) {
        try {
            const teacher = await this.teacherRepository.selectById(userId)
            await this.examRepository.deletExam(examId, teacher.id);
            return { success: true, message: 'El examen fue eliminado' }
        } catch (error) {
            return { success: false, message: 'Error al eliminar el examen' }
        }
    }

    async getExamControl(examSlug: string) {
        try {
            const exam = await this.examRepository.selectExam(examSlug);
            if(!exam) return { success: false, message: 'Error al obtener información', exam: null, students: [] }
            const students = await this.examRepository.selectStudentsWithSubmissions(exam.groupId, exam.id);
            return { success: true, message: '',  exam, students: students?? []}
        } catch (error) {
            return { success: false, message: 'Error al obtener información, intenta de nuevo', exam: null, students: [] }
        }

    }
}

export const examService = new ExamService(examRepository, studentsRepository, notificationRepository, teacherRepository);