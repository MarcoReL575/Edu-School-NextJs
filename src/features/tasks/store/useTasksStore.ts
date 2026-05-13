'use client'

import { create } from 'zustand'
import { TeachersClases } from '../../teachers/types/types';

interface TasksStore {
    teachersClases: TeachersClases[];
    setteachersClases: (group: TeachersClases[])=> void;
}

export const useTasksStore = create<TasksStore>()((set) => ({
    teachersClases: [] as TeachersClases[],
    setteachersClases: (group)=> set({ teachersClases: group })
}))