import { db } from "@/src/db";
import { StatusTask, TaskDetails, TaskInsert, TaskTeacher } from "../types/types";
import { clases, group, subjects, tasks, teachers } from "@/src/db/schema";
import { asc, eq } from "drizzle-orm";

export interface ITaskRepository{
    insertTask(taskInput: TaskInsert): Promise<void>;
    selectTasks(groupId: string): Promise<TaskDetails[]>;
    selectTasksTeacher(teacherId: string): Promise<TaskTeacher[]>;
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
                taskCreatedAt: tasks.createdAt,
                taskStatus: tasks.status
            })
            .from(tasks)
            .innerJoin(clases, eq(tasks.claseId, clases.id))
            .innerJoin(group, eq(group.id, clases.groupId))
            .innerJoin(subjects, eq(subjects.id, clases.subjectId))
            .innerJoin(teachers, eq(teachers.id, clases.teacherId))
            .where(eq(group.id, groupId))
            
        return taskList
    }

    async selectTasksTeacher(teacherId: string): Promise<TaskTeacher[]> {
        const taskTeachers = await db
            .select({
                id: tasks.id,
                title: tasks.title,
                description: tasks.description,
                createdAt: tasks.createdAt,
                fechaEntrega: tasks.fechaEntrega,
                status: tasks.status,
                claseId: clases.id,
                subjectName: subjects.name,
                groupName: group.group,
                gradeName: group.grade,
                level:  group.level
            })
            .from(tasks)
            .innerJoin(clases, eq(clases.id, tasks.claseId))
            .innerJoin(subjects, eq(clases.subjectId, subjects.id))
            .innerJoin(group, eq(clases.groupId, group.id))
            .where(eq (clases.teacherId, teacherId))
            .orderBy(asc(tasks.fechaEntrega))
        return taskTeachers;
    }
}

export const taskRepository = new TaskRepository()