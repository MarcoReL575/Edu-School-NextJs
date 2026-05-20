import { StatusTask, TaskDetails, TaskInsert, TaskTeacher } from "../types/types";
import { ITaskRepository, taskRepository } from "./taskRepository";

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

    async updateTaskStatus(taskId: number, statusTask: StatusTask) {
        await this.taskRepository.setTaskSatus(taskId, statusTask);
        return { success: true, message: 'El estatus fue modificado' };
    }

    async getTasksTeacher(teacherId: string) {
        try {
            const tasksList = await this.taskRepository.selectTasksTeacher(teacherId);
            return tasksList
        } catch (error) {
            return {} as TaskTeacher[]
        }
    }
}

export const taskService = new TaskService(taskRepository)