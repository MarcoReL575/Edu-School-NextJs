import { teachers } from "@/src/db/schema";

export type TeachersSelectType = typeof teachers.$inferSelect;
export type TeachersInsertType = typeof teachers.$inferInsert;