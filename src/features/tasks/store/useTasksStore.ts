'use client'

import { create } from 'zustand'
import { TeachersClases } from '../../teachers/types/types';

interface TasksStore {
    teachersClases: TeachersClases[];
    teacherId: string;
    taskId: number | undefined;
    studentId: string;
    setTaskId: (taskId: number)=> void;
    setStudentId: (studentId: string)=> void;
    setTeacherId: (teacherId: string)=> void;
    setteachersClases: (group: TeachersClases[])=> void;
}

export const useTasksStore = create<TasksStore>()((set) => ({
    teachersClases: [] as TeachersClases[],
    teacherId: '',
    taskId: undefined,
    studentId: '',
    setTaskId: (taskId)=> set({ taskId }),
    setStudentId: (studentId)=> set({ studentId }),
    setTeacherId: (teacherId)=> set({ teacherId }),
    setteachersClases: (group)=> set({ teachersClases: group })
}))