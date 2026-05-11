import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const group = pgTable('group', {
    id: uuid("id").primaryKey().defaultRandom(),
    grade: text("grade").notNull(), //2° 
    group: text('group').notNull(), // grupo A o grupo B 
    level: text('level').notNull(), //secundaria o preparatoria
});