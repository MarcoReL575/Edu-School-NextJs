import { TaskInsert } from "../types/types";
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
}

export const taskService = new TaskService(taskRepository)