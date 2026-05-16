import z from "zod";
import { tasks } from "@/src/db/schema";
import { CreateTaskSchema } from "../schemas/schemas";

export type CreateTask = z.input<typeof CreateTaskSchema>;

export type TaskSelect = typeof tasks.$inferSelect;
export type TaskInsert = typeof tasks.$inferInsert;

