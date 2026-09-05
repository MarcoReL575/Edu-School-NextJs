import { group } from "@/src/db/schema/groupSchema";

export type GroupSelectType = typeof group.$inferSelect;
export type GroupInsertType = typeof group.$inferInsert;
