import { notifications } from "@/src/db/schema";

export type NotificationSelect = typeof notifications.$inferSelect;
export type NotificationInsert = typeof notifications.$inferInsert;