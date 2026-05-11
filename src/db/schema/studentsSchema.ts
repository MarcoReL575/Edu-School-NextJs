import { pgTable, text, boolean, uuid } from "drizzle-orm/pg-core";
import { nanoid } from 'nanoid';

import { group } from "./groupSchema";
import { user } from "./auth-schema";

export const students = pgTable('students', {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    lastName: text("last_name").notNull(),
    matricula: text("matricula").notNull().unique().$defaultFn(()=> nanoid(10)),
    inscrito: boolean('inscrito').default(true).notNull(),
    nivelEstudios: text("nivel_estudios").notNull(),
    
    groupId: uuid("group_id").notNull().references(()=> group.id),
    user_id: text('user_id').references(()=> user.id)
});