import { pgTable, text, boolean, uuid } from "drizzle-orm/pg-core";
import { subjects } from "./subjectsSchema";
import { teachers } from "./teachersSchema";
import { group } from "./groupSchema";

export const clases = pgTable('clases', {
    id: uuid("id").primaryKey().defaultRandom(),
    
    groupId: uuid('group_id').notNull().references(()=> group.id),
    subjectId: uuid('subject_id').notNull().references(()=> subjects.id),
    teacherId: uuid('teacher_id').notNull().references(()=> teachers.id),
});