import { db } from "@/src/db";
import { ExamSelectInfo, ExamStudentInfo, FullExamWithAnswers, InsertExamWithQuestions, SelectExam, SelectExamubmissions, StudentExamRender } from "../types/types";
import { examQuestionOptions, examQuestions, exams, examSubmissions } from "@/src/db/schema/examen-schema";
import { and, eq, sql } from "drizzle-orm";
import { group, students } from "@/src/db/schema";
import { studentExamRenderSchema } from "../schemas/schema";

export interface IExamRepository {
    createExamTransaction(dataExam: InsertExamWithQuestions): Promise<SelectExam>;
    selectExams(teacherId: string): Promise<ExamSelectInfo[]>;
    selectExamListStudents(studentId: string, groupId: string): Promise<ExamStudentInfo[]>;
    selectExam(examSlug: string): Promise<StudentExamRender | undefined>;
    selectExamWithAnswers(examSlug: string): Promise <FullExamWithAnswers | undefined>;
    submitExam(examData: FullExamWithAnswers, finalScore:number, studentId: string): Promise<void>;
    submittedExam(examId: string, studentId: string): Promise<SelectExamubmissions | undefined>
}

class ExamRepository implements IExamRepository {
    async createExamTransaction(dataExam: InsertExamWithQuestions): Promise<SelectExam> {
        const { questions, ...examData } = dataExam;

        return await db.transaction(async (tx) => {
            const [newExam] = await tx.insert(exams).values(examData).returning();

            for (const question of questions) {
                const [newQuestion] = await tx.insert(examQuestions).values({
                    examId: newExam.id,
                    questionText: question.questionText,
                    type: question.type,
                    points: question.points,
                }).returning();

                if (question.options.length > 0) {
                    await tx.insert(examQuestionOptions).values(
                        question.options.map((opt) => ({
                            questionId: newQuestion.id,
                            text: opt.text,
                            isCorrect: opt.isCorrect,
                        }))
                    );
                }
            }
            return newExam;
        });
    }

    async selectExams(teacherId: string): Promise<ExamSelectInfo[]> {
        const result = await db
            .select({
                id: exams.id,
                title: exams.title,
                subjectName: exams.subjectName,
                grade: group.grade,
                group: group.group,
                level: group.level,
                status: exams.status,
                createdAt: exams.createdAt,
                questionsCount: sql<number>`count(distinct ${examQuestions.id})`.mapWith(Number),
                totalStudents: sql<number>`(
                    select count(*) from ${students} 
                    where ${students.groupId} = ${exams.groupId}
                )`.mapWith(Number),
                submittedCount: sql<number>`(
                    select count(*) from ${examSubmissions} 
                    where ${examSubmissions.examId} = ${exams.id} 
                    and ${examSubmissions.status} = 'entregado'
                )`.mapWith(Number),
                averageScore: sql<number>`coalesce(
                    (select avg(${examSubmissions.score}) 
                    from ${examSubmissions} 
                    where ${examSubmissions.examId} = ${exams.id}
                    and ${examSubmissions.status} = 'entregado'), 0
                )`.mapWith(Number)
            })
            .from(exams)
            .leftJoin(examQuestions, eq(exams.id, examQuestions.examId))
            .leftJoin(group, eq(exams.groupId, group.id))
            .where(eq(exams.teacherId, teacherId))
            .groupBy(
                exams.id, 
                group.grade, 
                group.group, 
                group.level
            )
            .orderBy(exams.createdAt);
        return result
    }

    async selectExamListStudents(studentId: string, groupId: string): Promise<ExamStudentInfo[]> {
        const result = await db 
            .select({
                id: exams.id,
                slug: exams.slug,
                title: exams.title,
                subjectName: exams.subjectName,
                status: exams.status, // 'activo' o 'concluido' general de la escuela
                createdAt: exams.createdAt,
                questionsCount: sql<number>`count(distinct ${examQuestions.id})`.mapWith(Number),
      
                // Datos del grupo para el Badge superior de la tarjeta
                grade: group.grade,
                groupName: group.group,
                level: group.level,

                // Estado de entrega particular de ESTE alumno
                studentSubmissionStatus: examSubmissions.status, // 'en_progreso', 'entregado' o null si no ha iniciado
                studentScore: examSubmissions.score, // Su calificación individual
                submittedAt: examSubmissions.submittedAt
            })
            .from(exams)
            .leftJoin(examQuestions, eq(exams.id, examQuestions.examId))
            .leftJoin(group, eq(exams.groupId, group.id))
            .leftJoin(
                examSubmissions, 
                and(
                    eq(exams.id, examSubmissions.examId),
                    eq(examSubmissions.studentId, studentId)
                )
            )
            .where(
                and(
                    eq(exams.groupId, groupId),
                    sql`${exams.status} != 'borrador'`
                )
            )
            .groupBy(
                exams.id, 
                group.grade, 
                group.group, 
                group.level, 
                examSubmissions.id
            )
            .orderBy(exams.createdAt);
        return result;
    }

    async selectExam(examSlug: string): Promise<StudentExamRender | undefined> {
        const exam = await db.query.exams.findFirst({
            where: eq(exams.slug, examSlug),
            with: {
                questions: {
                    with: {
                        options: true
                    }
                }
            }
        })
        if (!exam) return undefined;
        return studentExamRenderSchema.parse(exam)
    }

    async selectExamWithAnswers(examSlug: string): Promise< FullExamWithAnswers| undefined> {
        const exam = await db.query.exams.findFirst({
            where: eq(exams.slug, examSlug),
            with: {
                questions: {
                    with: {
                        options: true
                    }
                }
            }
        })
        if (!exam) return undefined;
        return exam
    }

    async submitExam(examData: FullExamWithAnswers, finalScore:number, studentId: string): Promise<void> {
        await db.insert(examSubmissions).values({
            examId: examData.id,
            studentId: studentId,
            score: finalScore.toString(),
            status: 'entregado',
            submittedAt: new Date(),
        });
    }

    async submittedExam(examId: string, studentId: string): Promise<SelectExamubmissions | undefined> {
        const exists = await db.query.examSubmissions.findFirst({
            where: and(
                eq(examSubmissions.examId, examId),
                eq(examSubmissions.studentId, studentId)
            )
        })
        if (!exists) return undefined;
        return exists
    }
}

export const examRepository = new ExamRepository();