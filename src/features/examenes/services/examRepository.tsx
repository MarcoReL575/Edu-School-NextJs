import { db } from "@/src/db";
import { InsertExamWithQuestions, SelectExam } from "../types/types";
import { examQuestionOptions, examQuestions, exams } from "@/src/db/schema/examen-schema";

export interface IExamRepository {
    createExamTransaction(dataExam: InsertExamWithQuestions): Promise<SelectExam>;
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
}

export const examRepository = new ExamRepository();