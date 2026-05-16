import { db } from "@/src/db";
import { TaskInsert } from "../types/types";
import { tasks } from "@/src/db/schema";

export interface ITaskRepository{
    insertTask(taskInput: TaskInsert): Promise<void>;
}

class TaskRepository implements ITaskRepository {
    async insertTask(taskInput: TaskInsert): Promise<void> {
        await db
            .insert(tasks)
            .values(taskInput)
    }
}

export const taskRepository = new TaskRepository()