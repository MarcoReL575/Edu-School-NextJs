import { pgTable, uuid, decimal, timestamp, unique } from 'drizzle-orm/pg-core';
import { students } from './studentsSchema';
import { clases } from './clasesSchemas';

export const classGrades = pgTable('class_grades', {
    id: uuid('id').defaultRandom().primaryKey(),
    studentId: uuid('student_id').notNull().references(() => students.id, { onDelete: 'cascade' }),
    claseId: uuid('clase_id').notNull().references(() => clases.id, { onDelete: 'cascade' }),
    finalGrade: decimal('final_grade', { precision: 5, scale: 2 }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
    // 🌟 Asegura un solo registro por (alumno + clase)
    studentClaseUnique: unique().on(table.studentId, table.claseId),
}));