import { relations } from "drizzle-orm";
import { subjects } from "../schema/subjectsSchema";
import { clases } from "../schema/clasesSchemas";
import { group } from "../schema/groupSchema";
import { students } from "../schema/studentsSchema";
import { teachers } from "../schema/teachersSchema";
import { attendance } from "../schema/attendance-schema";
import { examQuestionOptions, examQuestions, exams, examSubmissions } from "../schema/examen-schema";
import { announcements } from "../schema/anuncios-schema";
import { user } from "../schema";

export const subjectsRelations = relations(subjects, ({ many }) => ({
    clases: many(clases),
}));

export const groupRelations = relations(group, ({ many, one }) => ({
    clases: many(clases),
    students: many(students),
    exams: many(exams),
}));

export const clasesRelations = relations(clases, ({ one, many }) => ({
    subject: one(subjects, {
        fields: [clases.subjectId],
        references: [subjects.id],
    }),
    teacher: one(teachers, {
        fields: [clases.teacherId],
        references: [teachers.id],
    }),
    group: one(group, {
        fields: [clases.groupId],
        references: [group.id],
    }),
    attendances: many(attendance)
}));

export const attendanceRelations = relations(attendance, ({ one }) => ({
    clase: one(clases, {
        fields: [attendance.claseId],
        references: [clases.id],
    }),
}));

export const studentsRelations = relations(students, ({ one, many }) => ({
    group: one(group, {
        fields: [students.groupId],
        references: [group.id],
    }),
    attendance: one(attendance, {
        fields: [students.id],
        references: [attendance.studentId],
    }),
    examSubmissions: many(examSubmissions) 
}));

export const examsQuestionsRelations = relations(examQuestions, ({ one, many }) => ({
    exam: one(exams, {
        fields: [examQuestions.examId],
        references: [exams.id],
    }),
    options: many(examQuestionOptions),
}));

// Relaciones para Opciones
export const examsQuestionOptionsRelations = relations(examQuestionOptions, ({ one }) => ({
    question: one(examQuestions, {
        fields: [examQuestionOptions.questionId],
        references: [examQuestions.id],
    }),
}));


export const examsSubmissionsRelations = relations(examSubmissions, ({ one }) => ({
    exam: one(exams, {
        fields: [examSubmissions.examId],
        references: [exams.id],
    }),
    student: one(students, {
        fields: [examSubmissions.studentId],
        references: [students.id],
    }),
}));

export const examsRelations = relations(exams, ({ many, one }) => ({
    examSubmissions: many(examSubmissions),
    questions: many(examQuestions),
    students: one(students)
}));


export const announcementsRelations = relations(announcements, ({ one }) => ({
    author: one(user, {
        fields: [announcements.authorId],
        references: [user.id],
    }),
}));