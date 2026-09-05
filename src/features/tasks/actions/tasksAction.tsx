'use server'

import { requireAuth } from "@/src/lib/auth-server";
import { taskService } from "../services/taskService";
import { CreateTask, GradeTasks, StatusTask, StudentSubmissionInput, SubmitTasksStudents, TaskSubmissionSelect, TaskTeacher } from "../types/types";
import { CreateTaskSchema } from "../schemas/schemas";
import { studentsService } from "../../students/services/StudentsService";

export async function createTaskAction(taskInput: CreateTask) {
    const { session } = await requireAuth();
    if(session.user.role !== 'maestro') return { success: false, message: 'El usuariio no cuenta con permisos para crear tareas' };

    const response = CreateTaskSchema.safeParse(taskInput);
    if(!response.success) return { success: false, message: 'Datos inválidos' };
    
    return await taskService.createTask(response.data);
}

export async function getTasksWithDetailsAction(groupId: string, studentId: string) {
    return await taskService.getAllTasks(groupId, studentId);
}

export async function getTasksTeacherAction(teacherId: string) {
    const { session } = await requireAuth();
    if(session.user.role !== 'maestro') return {} as TaskTeacher[];

    return await taskService.getTasksTeacher(teacherId)
}

export async function submitTaskAction(task: StudentSubmissionInput) {
    const { session } = await requireAuth();
    if(session.user.role !== 'estudiante') return { success: false, message: 'El usuariio no cuenta con permisos para entregar tareas' };  

    const studentInfo = await studentsService.getInfoStudentById(session.user.id);
    if(!studentInfo) return { success: false, message: 'No se encontró información del estudiante' };

    return await taskService.submitTask(task, studentInfo.id);
}

export async function taskStudentAction(groupId: string, taskId:number) {
    const { session } = await requireAuth();
    if(session.user.role !== 'maestro') return { success: false, message: 'El usuariio no cuenta con permisos para calificar tareas', data: [] as SubmitTasksStudents[] };

    return await taskService.getSubmissionTaskStudents(groupId, taskId);
}

export async function gradeTaskAction(submissionId: string, grade: number, feedback: string) {
    const { session } = await requireAuth();
    if(session.user.role !== 'maestro') return { success: false, message: 'El usuariio no cuenta con permisos para calificar tareas', task: {} as TaskSubmissionSelect };

    return await taskService.gradeTask(submissionId, grade, feedback);
}

export async function getActualGradeTaskAction(submissionId: string) {
    const { session } = await requireAuth();
    if(session.user.role !== 'maestro') return { success: false, message: 'El usuariio no cuenta con permisos para calificar tareas', data: null };   

    return await taskService.selectTaskGraded(submissionId);
}

export async function updateTaskGradedAction(taskGraded: GradeTasks) {
    const { session } = await requireAuth();
    if(session.user.role !== 'maestro') return { success: false, message: 'El usuariio no cuenta con permisos para calificar tareas', task: {} as TaskSubmissionSelect };    
    
    return await taskService.updateTaskGraded(taskGraded);
}