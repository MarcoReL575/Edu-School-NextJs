import { parents, parentStudents } from "@/src/db/schema";

export type ParentsSelectType = typeof parents.$inferSelect;
export type ParentStudentsSelectType = typeof parentStudents.$inferSelect;
