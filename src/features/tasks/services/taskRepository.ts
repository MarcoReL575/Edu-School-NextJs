import { db } from "@/src/db";
import { StatusTask, StudentSubmissionInput, SubmitTasksStudents, SubmitTaskStatus, TaskDetails, TaskInsert, TaskSubmissionSelect, TaskTeacher } from "../types/types";
import { clases, group, students, subjects, taskAttachments, tasks, teachers } from "@/src/db/schema";
import { asc, eq, not, sql } from "drizzle-orm";
import { taskSubmission } from "@/src/db/schema/taskSubmissions-schema";

export interface ITaskRepository{
    insertTask(taskInput: TaskInsert): Promise<void>;
    selectTasks(groupId: string): Promise<TaskDetails[]>;
    selectTasksTeacher(teacherId: string): Promise<TaskTeacher[]>;
    insertStudentSubmission(taskId: number, studentId: string): Promise<TaskSubmissionSelect>;
    setStatusTask(taskId: number, status: StatusTask): Promise<void>;
    selectSubmissionTasktudents(groupId: string): Promise<SubmitTasksStudents[]>;
    selectGroupIdByTaskId(taskId: number): Promise<string>;
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

    async insertStudentSubmission(taskId: number, studentId: string): Promise<TaskSubmissionSelect> {
        const [result] = await db
            .insert(taskSubmission)
            .values({
                studentId,
                taskId,
                status: 'entregada',
                submittedAt: new Date(),
            })
            .returning()
        return result;
    }

    async setStatusTask(taskId: number, status: StatusTask): Promise<void> {
        await db
            .update(tasks)
            .set({ status })
            .where(eq(tasks.id, taskId))
    }

    async selectSubmissionTasktudents(groupId: string): Promise<SubmitTasksStudents[]> {
        const taskList = await db
            .select({
                student: {
                    id: students.id,
                    name: students.name,
                    last_name: students.lastName,

                },
                submission: {
                    id: taskSubmission.id,
                    status: sql<SubmitTaskStatus>`${taskSubmission.status}`,
                    submittedAt: taskSubmission.submittedAt,
                    calificacion: taskSubmission.calificacion,
                    feedback: taskSubmission.feedback
                }
            })
            .from(students)
            .innerJoin(taskSubmission, eq(taskSubmission.studentId, students.id))
            .innerJoin(group, eq(students.groupId, group.id))
            .where(eq(group.id, groupId))
            .orderBy(asc(students.name))
        return taskList;
    }

    async selectGroupIdByTaskId(taskId: number): Promise<string> {
        const [result] = await db
            .select({
                groupId: group.id
            })
            .from(tasks)
            .innerJoin(clases, eq(clases.id, tasks.claseId))
            .innerJoin(group, eq(group.id, clases.groupId))
            .where(eq(tasks.id, taskId))
        return result.groupId;
    }
}
export const taskRepository = new TaskRepository()