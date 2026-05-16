'use server'

import { requireAuth } from "@/src/lib/auth-server";
import { taskService } from "../services/taskService";
import { CreateTask } from "../types/types";
import { CreateTaskSchema } from "../schemas/schemas";

export async function createTaskAction(taskInput: CreateTask) {
    const { session } = await requireAuth();
    if(session.user.role !== 'maestro') return { success: false, message: 'El usuariio no cuenta con permisos para crear tareas' };

    const response = CreateTaskSchema.safeParse(taskInput);
    if(!response.success) return { success: false, message: 'Datos inválidos' };
    
    return await taskService.createTask(response.data);
}

export async function getTasksWithDetailsAction(groupId: string) {
    return await taskService.getAllTasks(groupId);
}