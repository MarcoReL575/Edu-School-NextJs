import { db } from "@/src/db";
import { ExamSelectInfo, InsertExamWithQuestions, SelectExam } from "../types/types";
import { examQuestionOptions, examQuestions, exams, examSubmissions } from "@/src/db/schema/examen-schema";
import { eq, sql } from "drizzle-orm";
import { group, students } from "@/src/db/schema";

export interface IExamRepository {
    createExamTransaction(dataExam: InsertExamWithQuestions): Promise<SelectExam>;
    selectExams(teacherId: string): Promise<ExamSelectInfo[]>;
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
}

export const examRepository = new ExamRepository();