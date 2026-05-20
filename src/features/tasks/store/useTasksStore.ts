'use client'

import { create } from 'zustand'
import { TeachersClases } from '../../teachers/types/types';

interface TasksStore {
    teachersClases: TeachersClases[];
    teacherId: string;
    setTeacherId: (teacherId: string)=> void;
    setteachersClases: (group: TeachersClases[])=> void;
}

export const useTasksStore = create<TasksStore>()((set) => ({
    teachersClases: [] as TeachersClases[],
    teacherId: '',
    setTeacherId: (teacherId)=> set({ teacherId }),
    setteachersClases: (group)=> set({ teachersClases: group })
}))