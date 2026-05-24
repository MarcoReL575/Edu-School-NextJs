import { db } from "@/src/db";
import { GradeTasks, StatusTask, StudentSubmissionInput, SubmitTasksStudents, SubmitTaskStatus, TaskDetails, TaskInfoTeacher, TaskInsert, TaskSelect, TaskSubmissionSelect, TaskTeacher } from "../types/types";
import { clases, group, students, subjects, taskAttachments, tasks, teachers } from "@/src/db/schema";
import { and, asc, eq, not, sql } from "drizzle-orm";
import { taskSubmission } from "@/src/db/schema/taskSubmissions-schema";

export interface ITaskRepository{
    insertTask(taskInput: TaskInsert): Promise<void>;
    selectTasks(groupId: string): Promise<TaskDetails[]>;
    selectTaskByTaksId(taskId: number): Promise<TaskInfoTeacher>;
    selectTasksTeacher(teacherId: string): Promise<TaskTeacher[]>;
    selectStatusTask(taskId: number): Promise<StatusTask>;
    insertStudentSubmission(taskId: number, studentId: string): Promise<TaskSubmissionSelect>;
    selectSubmissionTasktudents(groupId: string, taskId: number): Promise<SubmitTasksStudents[]>;
    selectGroupIdByTaskId(taskId: number): Promise<string>;
    setTaskSubmission(submissionId: string, grade: number, feedback: string): Promise<void>;
    selectTaskGraded(submissionId: string): Promise<GradeTasks>;
    setTaskGraded(task: GradeTasks): Promise<void>;
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

    async selectTaskByTaksId(taskId: number): Promise<TaskInfoTeacher> {
        const [task] = await db
            .select({
                id: tasks.id,
                title: tasks.title,
                description: tasks.description,
                fechaEntrega: tasks.fechaEntrega,
                createdAt: tasks.createdAt,
                status: tasks.status,
                groupId: group.id,
                subjectName: subjects.name,
                grade: group.grade,
                level: group.level, 
                group: group.group
            })
            .from(tasks)
            .innerJoin(clases, eq(tasks.claseId, clases.id))
            .innerJoin(group, eq(group.id, clases.groupId))
            .innerJoin(subjects, eq(subjects.id, clases.subjectId))
            .where(eq(tasks.id, taskId))
        return task;
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

    async selectStatusTask(taskId: number): Promise<StatusTask> {
        const [result] = await db
            .select({ status: taskSubmission.status })
            .from(taskSubmission)
            .where(eq(taskSubmission.taskId, taskId))
        return result.status as StatusTask;
    }

    async selectSubmissionTasktudents(groupId: string, taskId: number): Promise<SubmitTasksStudents[]> {
        const taskList = await db
            .select({
                studentId: students.id,
                studentName: students.name,
                studentLastname: students.lastName,
                submissionId: taskSubmission.id,
                submissionStatus: sql<SubmitTaskStatus>`${taskSubmission.status}`,
                submittedAt: taskSubmission.submittedAt,
                calificacion: taskSubmission.calificacion,
                feedback: taskSubmission.feedback,
                attachmentId: taskAttachments.id,
                attachmentFileUrl: taskAttachments.fileUrl,
                attachmentsFileName: taskAttachments.fileName,
                attachmentFileType: taskAttachments.fileType
            })
            .from(students)
            .where(eq(students.groupId, groupId))
            .leftJoin(taskSubmission, and(
                eq(taskSubmission.studentId, students.id),
                eq(taskSubmission.taskId, taskId)
            ))
            .leftJoin(taskAttachments, eq(taskAttachments.taskSubmissionId, taskSubmission.id))
            .orderBy(asc(students.name))

        const grouped = taskList.reduce<Record<string, SubmitTasksStudents>>((acc, row) => {
            if(!acc[row.studentId]) {
                acc[row.studentId] = {
                    studentId: row.studentId,
                    studentName: row.studentName,
                    studentLastname: row.studentLastname,
                    submissionId: row.submissionId,
                    submissionStatus: row.submissionStatus,
                    submittedAt: row.submittedAt,
                    calificacion: row.calificacion,
                    feedback: row.feedback,
                    attachments: []
                };
            }

            if(row.attachmentId) {
                acc[row.studentId].attachments!.push({
                    id: row.attachmentId,
                    fileUrl: row.attachmentFileUrl!,
                    fileName: row.attachmentsFileName!,
                    fileType: row.attachmentFileType!,
                });
            }
            return acc;
        }, {});

        return Object.values(grouped);
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

    async setTaskSubmission(submissionId: string, grade: number, feedback: string): Promise<void> {
        await db
            .update(taskSubmission)
            .set({
                calificacion: grade.toString(),
                feedback
            })
            .where(eq(taskSubmission.id, submissionId))
    }

    async selectTaskGraded(submissionId: string): Promise<GradeTasks> {
        const [result] = await db
            .select({ 
                taskGradedId: taskSubmission.id,
                grade: taskSubmission.calificacion, 
                feedback: taskSubmission.feedback 
            })
            .from(taskSubmission)
            .where(eq(taskSubmission.id, submissionId))
        return { grade: parseFloat(result.grade), feedback: result.feedback, taskSubmissionId: result.taskGradedId };
    }

    async setTaskGraded(taskGraded: GradeTasks): Promise<void> {
        await db
            .update(taskSubmission)
            .set({
                calificacion: taskGraded.grade.toString(),
                feedback: taskGraded.feedback
            })
            .where(eq(taskSubmission.id, taskGraded.taskSubmissionId))
    }
}
export const taskRepository = new TaskRepository();