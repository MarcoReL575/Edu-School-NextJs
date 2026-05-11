import { pgTable, text, uuid} from "drizzle-orm/pg-core";

export const subjects = pgTable('subjects', {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text('name').notNull(),
    nivelAcademico: text('nivel_academico').notNull(),
});