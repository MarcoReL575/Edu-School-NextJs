'use client'

import { create } from 'zustand'
import { TeachersClases } from '../../teachers/types/types';
import { GradeTasks } from '../types/types';

interface TasksStore {
    teachersClases: TeachersClases[];
    teacherId: string;
    taskId: number | undefined;
    studentId: string;
    taskSubmissionId: string;
    taskEdit: boolean;
    taskGraded: GradeTasks;
    setTaskGraded: (taskGraded: GradeTasks)=> void;
    setTaskEdit: (taskEdit: boolean)=> void;
    setTaskSubmissionId: (taskSubmissionId: string)=> void;
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
    taskSubmissionId: '',
    taskEdit: false,
    taskGraded: {} as GradeTasks,
    setTaskEdit: (taskEdit)=> set({ taskEdit }),
    setTaskSubmissionId: (taskSubmissionId)=> set({ taskSubmissionId }),
    setTaskId: (taskId)=> set({ taskId }),
    setStudentId: (studentId)=> set({ studentId }),
    setTeacherId: (teacherId)=> set({ teacherId }),
    setteachersClases: (group)=> set({ teachersClases: group }),
    setTaskGraded: (taskGraded)=> set({ taskGraded })
}))