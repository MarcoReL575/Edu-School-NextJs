import { db } from "@/src/db";
import { TaskDetails, TaskInsert } from "../types/types";
import { clases, group, subjects, tasks, teachers } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export interface ITaskRepository{
    insertTask(taskInput: TaskInsert): Promise<void>;
    selectTasks(groupId: string): Promise<TaskDetails[]>
}

class TaskRepository implements ITaskRepository {
    async insertTask(taskInput: TaskInsert): Promise<void> {
        await db
            .insert(tasks)
            .values(taskInput)
    }

    async selectTasks(groupId: string): Promise<TaskDetails[]> {
        const taskList = await db
            .select({
                id: clases.id,
                subjectName: subjects.name,
                teacherName: teachers.name,
                teachersLastName: teachers.lastName,
                taskId: tasks.id,
                taskTitle: tasks.title,
                taskDescription: tasks.description,
                taskFechaEntrega: tasks.fechaEntrega,
                taskCreatedAt: tasks.createdAt
            })
            .from(tasks)
            .innerJoin(clases, eq(clases.groupId, group.id))
            .innerJoin(group, eq(group.id, clases.groupId))
            .innerJoin(subjects, eq(subjects.id, clases.subjectId))
            .innerJoin(teachers, eq(teachers.id, clases.teacherId))
            .where(eq(group.id, groupId))
            
        return taskList
    }
}

export const taskRepository = new TaskRepository()