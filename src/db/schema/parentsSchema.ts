import { pgTable, text, uuid, } from "drizzle-orm/pg-core";
import { students } from "./studentsSchema";
import { user } from "./auth-schema";

export const parents = pgTable('parents', {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    lastName: text("last_name").notNull(),
    
    studentId: uuid('stuednt_id').notNull().references(()=> students.id),
    user_id: text('user_id').notNull().references(()=> user.id)
});