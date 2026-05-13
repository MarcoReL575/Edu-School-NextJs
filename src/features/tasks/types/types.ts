import z from "zod";
import { CreateTaskSchema } from "../schemas/schemas";
import { tasks } from "@/src/db/schema";

export type CreateTask = z.infer<typeof CreateTaskSchema>;

export type TaskSelect = typeof tasks.$inferSelect;
export type TaskInsert = typeof tasks.$inferInsert;