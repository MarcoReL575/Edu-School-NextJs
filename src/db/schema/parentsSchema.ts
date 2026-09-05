import { pgTable, text, uuid, primaryKey } from "drizzle-orm/pg-core";
import { students } from "./studentsSchema";
import { user } from "./auth-schema";

export const parents = pgTable('parents', {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    lastName: text("last_name").notNull(),

    user_id: text('user_id').notNull().references(()=> user.id)
});

export const parentStudents = pgTable('parent_students', {
    parentId: uuid('parent_id').notNull().references(()=> parents.id),
    studentId: uuid('student_id').notNull().references(()=> students.id),
}, (table) => [
    primaryKey({ columns: [table.parentId, table.studentId] })
]);
