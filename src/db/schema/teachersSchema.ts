import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { nanoid } from 'nanoid';
import { user } from "./auth-schema";

export const teachers = pgTable('teachers', {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    lastName: text("last_name").notNull(),
    level: text("level").notNull(),
    code_teacher: text("code_teacher").notNull().unique().$defaultFn(()=> nanoid(6)),
    
    userId: text('user_id').references(()=> user.id)
});