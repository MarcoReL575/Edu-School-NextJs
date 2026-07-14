import z from "zod";
import { baseExamSchema, insertExamSchema, questionSchema, selectExamSchema, studentExamRenderSchema, studentOptionSchema, studentQuestionSchema } from "../schemas/schema";
import { examQuestionOptions, examQuestions, exams, examSubmissions } from "@/src/db/schema/examen-schema";

// Tipo de TypeScript inferido para mayor seguridad
export type InsertExam = typeof exams.$inferInsert
export type SelectExam = typeof exams.$inferSelect

export type InsertExamSubmissions = typeof examSubmissions.$inferInsert
export type SelectExamubmissions = typeof examSubmissions.$inferSelect

export type InsertExamWithQuestions = z.infer<typeof insertExamSchema>;
export type SelectExamWithQuestions = z.infer<typeof selectExamSchema>
export type QuestionsExam = z.infer<typeof questionSchema>;

export type SelectQuestions = typeof examQuestions.$inferSelect;
export type InsertQuestions = typeof examQuestions.$inferInsert;

export type SelectOptions = typeof examQuestionOptions.$inferSelect;
export type InsertOptions = typeof examQuestionOptions.$inferInsert;

export type ExamSelectInfo = {
    id: string;
    slug: string;
    title: string;
    subjectName: string;
    grade: string | null;
    group: string | null;
    level: string | null;
    status: string;
    createdAt: Date;
    questionsCount: number;
    totalStudents: number;
    submittedCount: number;
    averageScore: number;
}

export type ExamStudentInfo = {
    id: string;
    slug: string;
    title: string;
    subjectName: string;
    grade: string | null;
    groupName: string | null;
    level: string | null;
    status: string;
    createdAt: Date;
    questionsCount: number;
    studentSubmissionStatus: string | null;
    studentScore: string | null;
    submittedAt: Date | null;
} 

export type StudentExamRender = z.infer<typeof studentExamRenderSchema>;
export type StudentQuestionRender = z.infer<typeof studentQuestionSchema>;
export type StudentOptionRender = z.infer<typeof studentOptionSchema>;

export type SubmitExam = {
    examId: string;
    examSlug: string;
    answers: Record<string, string>;
}


export type FullExamWithAnswers = {
    id: string;
    title: string;
    subjectName: string;
    status: string;
    slug: string;
    teacherId: string;
    groupId: string;
    createdAt: Date;
    updatedAt: Date;
    questions: {
        id: string;
        examId: string;
        type: string;
        questionText: string;
        points: number;
        createdAt: Date;
        options: {
            id: string;
            questionId: string;
            text: string;
            isCorrect: boolean; 
        }[];
    }[];
};

export type StudentsSubmissions = {
    id: string;
    name: string;
    lastName: string;
    matricula: string;
    inscrito: boolean;
    nivelEstudios: string;
    groupId: string;
    user_id: string | null;
    examSubmissions: {
        id: string;
        status: string;
        studentId: string;
        examId: string;
        score: string | null;
        startedAt: Date;
        submittedAt: Date | null;
    }[];
}[]

export type StudentRowData = {
    id: string;
    groupId: string;
    name: string;
    lastName: string;
    examSubmissions: {
        id: string;
        examId: string;
        studentId: string;
        score: string | null;
        status: string;
        startedAt: string | Date;
        submittedAt: string | Date | null;
    }[];
};

export type ExamWithResult = {
    examId: string;
    title: string;
    createdAt: Date;
    // Campos de la entrega del alumno (pueden ser null si no lo ha hecho)
    score: string | null,
    statusSubmission: string | null;
    submittedAt: Date | null;
}
