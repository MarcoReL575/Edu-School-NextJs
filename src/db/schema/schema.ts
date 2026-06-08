import { relations } from "drizzle-orm";
import { clases } from "./clasesSchemas";
import { subjects } from "./subjectsSchema";
import { group } from "./groupSchema";
import { students } from "./studentsSchema";
import { attendance } from "./attendance-schema";

export const subjectsRelations = relations(subjects, ({ many }) => ({
    clases: many(clases),
}));

export const groupRelations = relations(group, ({ many, one }) => ({
    clases: many(clases),
    students: many(students),
}));

export const clasesRelations = relations(clases, ({ one }) => ({
    subject: one(subjects, {
        fields: [clases.subjectId],
        references: [subjects.id],
    }),
    group: one(group, {
        fields: [clases.groupId],
        references: [group.id],
    }),
    attendance: one(attendance, {
        fields: [clases.id],
        references: [attendance.claseId],
    })
}));

export const studentsRelations = relations(students, ({ one }) => ({
    group: one(group, {
        fields: [students.groupId],
        references: [group.id],
    }),
    attendance: one(attendance, {
        fields: [students.id],
        references: [attendance.studentId],
    })
}));