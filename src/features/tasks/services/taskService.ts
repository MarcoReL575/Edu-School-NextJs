import { db } from "@/src/db";
import { GradeTasks, StatusTask, StudentSubmissionInput, SubmitTasksStudents, TaskDetails, TaskInfoTeacher, TaskInsert, TaskSelect, TaskTeacher } from "../types/types";
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

    async getAllTasks(groupId: string, studentId: string) {
        try {
            const taskList = await this.taskRepository.selectTasks(groupId, studentId);
            return { success: true, message: '', data: taskList };
        } catch (error) {
            console.error(error)
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
            return { success: false, message: 'Se produjo un error al entregar la tarea, vuelva a intentarlo' }
        }
    }

    async getStatusTask(taskId: number) {
        try {
            const status = await this.taskRepository.selectStatusTask(taskId);
            return { success: true, message: '', data: status };
        } catch (error) {
            return { success: false, message: 'Se produjo un error al obtener el estado de la tarea', data: '' as StatusTask };
        }
    }

    async getSubmissionTaskStudents(groupId: string, taskId: number) {
        try {
            const taskList = await this.taskRepository.selectSubmissionTasktudents(groupId, taskId);
            return { success: true, message: '', data: taskList };
        } catch (error) {
            return { success: false, message: 'Se produjo un error al obtener los datos, vuelva a intentarlo', data: [] as SubmitTasksStudents[] };
        }   
    }

    async getGroupIdByTaskId(taskId: number) {
        try {
            const groupId = await this.taskRepository.selectGroupIdByTaskId(taskId);
            return { success: true, message: '', groupId };
        } catch (error) {
            return { success: false, message: 'Se produjo un error al obtener el ID del grupo', groupId: '' };
        }
    }

    async getTaskByTaskId(taskId: number) {
        try {
            const task = await this.taskRepository.selectTaskByTaksId(taskId);
            return { success: true, message: '', data: task };
        } catch (error) {
            return { success: false, message: 'Se produjo un error al obtener los datos, vuelva a intentarlo', data: {} as TaskInfoTeacher };
        }
    }

    async gradeTask(submissionId: string, grade: number, feedback: string) {
        try {
            await this.taskRepository.setTaskSubmission(submissionId, grade, feedback);
            return { success: true, message: 'Tarea calificada con éxito' }
        } catch (error) {
            return { success: false, message: 'Se produjo un error al calificar la tarea, vuelva a intentarlo' }
        }
    }

    async taskExists(taskId: string) {
        try {
            const data = await this.taskRepository.selectTaskGraded(taskId);
            return { success: true, message: '', data  };
        } catch (error) {
            return { success: false, message: 'No se encontró una tarea con ese ID', data: {} as GradeTasks };
        }
    }

    async selectTaskGraded(submissionId: string) {
        try {
            return await this.taskExists(submissionId);
        } catch (error) {
            console.error(error);
            return { success: false, message: 'Se produjo un error al obtener los datos, vuelva a intentarlo', data: {} as GradeTasks };
        }
    }

    async updateTaskGraded(taskGraded: GradeTasks) {
        try {1
            const exists = await this.taskExists(taskGraded.taskSubmissionId);
            if(!exists.success) {
                return { success: false, message: 'No se encontró una tarea con ese ID' }
            }
            await this.taskRepository.setTaskGraded(taskGraded);
            return { success: true, message: 'Tarea editada con éxito' }
        } catch (error) {
            console.error(error);
            return { success: false, message: 'Se produjo un error al editar la tarea, vuelva a intentarlo' }
        }
    }
}

export const taskService = new TaskService(taskRepository);