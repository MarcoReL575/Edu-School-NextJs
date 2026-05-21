import { db } from "@/src/db";
import { StatusTask, StudentSubmissionInput, SubmitTasksStudents, TaskDetails, TaskInsert, TaskTeacher } from "../types/types";
import { ITaskRepository, taskRepository } from "./taskRepository";
import { file } from "zod";
import { group, students, taskAttachments } from "@/src/db/schema";
import { taskSubmission } from "@/src/db/schema/taskSubmissions-schema";
import { asc, eq } from "drizzle-orm";

class TaskService {
    constructor(
        private taskRepository: ITaskRepository
    ){}

    async createTask(taskInput: TaskInsert){
        try {
            await this.taskRepository.insertTask(taskInput);
            return { success: true, message: 'La tarea fue creada' }        
        } catch (error) {
            console.error(error);
            return { success: false, message: 'Se produjo un error en base de datos, vuelva a intentarlo' };
        }
    }

    async getAllTasks(groupId: string) {
        try {
            const taskList = await this.taskRepository.selectTasks(groupId);
            return { success: true, message: '', data: taskList };
        } catch (error) {
            return { success: false, message: 'Se produjo un error al obtener los datos, vuelva a intentarlo', data: {} as TaskDetails[] };
        }
    } 

    async getTasksTeacher(teacherId: string) {
        try {
            const tasksList = await this.taskRepository.selectTasksTeacher(teacherId);
            return tasksList
        } catch (error) {
            return {} as TaskTeacher[]
        }
    }

    async submitTask(task: StudentSubmissionInput, studentId: string) {
        try {
            return await db.transaction(async (tx) => {
                const submissionResult = await this.taskRepository.insertStudentSubmission(+task.taskId, studentId);
                const updateStatusTask = await this.taskRepository.setStatusTask(+task.taskId, "terminada");

                const attachmentsData = task.attachments.map((file) => ({
                    fileUrl: file.fileUrl,
                    fileName: file.fileName,
                    fileType: file.fileType,
                    taskSubmissionId: submissionResult.id
                }));
                await tx.insert(taskAttachments).values(attachmentsData);
                return { success: true, message: 'Tarea entregada con éxito' }
            });
        } catch (error) {
            console.error(error);
            return { success: false, message: 'Se produjo un error al entregar la tarea, vuelva a intentarlo' }
        }
    }

    async getSubmissionTaskStudents(groupId: string, taskId: number) {
        try {
            const taskList = await this.taskRepository.selectSubmissionTasktudents(groupId, taskId);
            return { success: true, message: '', data: taskList };
        } catch (error) {
            console.error(error);
            return { success: false, message: 'Se produjo un error al obtener los datos, vuelva a intentarlo', data: [] as SubmitTasksStudents[] };
        }   
    }

    async getGroupIdByTaskId(taskId: number) {
        try {
            const groupId = await this.taskRepository.selectGroupIdByTaskId(taskId);
            return { success: true, message: '', groupId };
        } catch (error) {
            console.error(error);
            return { success: false, message: 'Se produjo un error al obtener el ID del grupo', groupId: '' };
        }
    }
}

export const taskService = new TaskService(taskRepository)