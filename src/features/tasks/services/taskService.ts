import { db } from "@/src/db";
import { GradeTasks, StatusTask, StudentSubmissionInput, SubmitTasksStudents, TaskDetails, TaskInfoTeacher, TaskInsert, TaskSelect, TaskSubmissionSelect, TaskTeacher } from "../types/types";
import { ITaskRepository, taskRepository } from "./taskRepository";
import { taskAttachments } from "@/src/db/schema";
import { INotificationRepository, notificationRepository } from "../../notifications/services/notificationRepository";
import { groupRepository, IGroupRepository } from "../../clases/services/GroupRepository";
import { IStudentsRepository, studentsRepository } from "../../clases/services/StudentsRepository";
import { getCorrectDate } from "../helpers/getCorrectDate";
import { INotificationPublisher, notificationPusher } from "../../notifications/services/NotificationPusher";

class TaskService {
    constructor(
        private taskRepository: ITaskRepository,
        private notificationRepository : INotificationRepository,
        private groupRepository: IGroupRepository,
        private studentsRepository: IStudentsRepository,
        private notificationPusher: INotificationPublisher
    ){}

    async createTask(taskInput: TaskInsert){
        try {
            const task = await this.taskRepository.insertTask(taskInput);
            const infoTask = await this.taskRepository.selectTaskByTaksId(task.id)
            //Creamos notificación
            const group = await this.groupRepository.selectGroupByClaseId(task.claseId);
            const listStudents = await this.studentsRepository.selectStudentsInGroup(group.id);
            if(listStudents.length > 0) {
                const notificationsPayload = listStudents.filter((student)=> student.user_id !== null).map((student)=>({
                    userId: student.user_id as string,
                    title: `Nueva tarea: ${infoTask.subjectName}`,
                    message: `${infoTask.title} - ${task.description}. Fecha de entrega: ${getCorrectDate(task.fechaEntrega)}` ,
                    type: 'task_created' as const ,
                    isRead: false,
                    redirectUrl: '/dashboard/tareas',
                }))
                // Insertamos todas las notificaciones en un solo query a la base de datos
                if(notificationsPayload.length > 0) {
                    const insertedNotifications = await this.notificationRepository.insertMany(notificationsPayload);
                    await this.notificationPusher.notifyMany(insertedNotifications);

                }
            }
            return { success: true, message: 'La tarea fue creada' }        
        } catch (error) {
            return { success: false, message: 'Se produjo un error en base de datos, vuelva a intentarlo' };
        }
    }

    async getAllTasks(groupId: string, studentId: string) {
        try {
            const taskList = await this.taskRepository.selectTasks(groupId, studentId);
            return { success: true, message: '', tasks: taskList };
        } catch (error) {
            console.error(error)
            return { success: false, message: 'Se produjo un error al obtener los datos, vuelva a intentarlo', tasks: [] as TaskDetails[] };
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
            const task = await this.taskRepository.setTaskSubmission(submissionId, grade, feedback);
            return { success: true, message: 'Tarea calificada con éxito', task  }
        } catch (error) {
            return { success: false, message: 'Se produjo un error al calificar la tarea, vuelva a intentarlo', task: {} as TaskSubmissionSelect }
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
                return { success: false, message: 'No se encontró una tarea con ese ID', task: {} as TaskSubmissionSelect }
            }
            const task = await this.taskRepository.setTaskGraded(taskGraded);
            return { success: true, message: 'Tarea editada con éxito', task }
        } catch (error) {
            console.error(error);
            return { success: false, message: 'Se produjo un error al editar la tarea, vuelva a intentarlo', task: {} as TaskSubmissionSelect }
        }
    }
}

export const taskService = new TaskService(taskRepository, notificationRepository, groupRepository, studentsRepository, notificationPusher);