'use client'

import { create } from 'zustand'
import { TeachersClases } from '../../teachers/types/types';
import { GradeTasks, StatusTask, TaskDetails } from '../types/types';

interface TasksStore {
    teachersClases: TeachersClases[];
    teacherId: string;
    task: TaskDetails;
    studentId: string;
    taskSubmissionId: string;
    taskEdit: boolean;
    taskGraded: GradeTasks;
    statusTask: StatusTask;
    teacherUserId: string;
    setTeacherUserId: (userId: string)=> void;
    setStatusTask: (statusTask: StatusTask)=> void;
    setTaskGraded: (taskGraded: GradeTasks)=> void;
    setTaskEdit: (taskEdit: boolean)=> void;
    setTaskSubmissionId: (taskSubmissionId: string)=> void;
    setTask: (task: TaskDetails)=> void;
    setStudentId: (studentId: string)=> void;
    setTeacherId: (teacherId: string)=> void;
    setteachersClases: (group: TeachersClases[])=> void;
}

export const useTasksStore = create<TasksStore>()((set) => ({
    teachersClases: [] as TeachersClases[],
    teacherId: '',
    task: {} as TaskDetails,
    studentId: '',
    taskSubmissionId: '',
    taskEdit: false,
    taskGraded: {} as GradeTasks,
    statusTask: 'pendiente',
    teacherUserId: '',
    setTeacherUserId: (userId: string)=> set({ teacherUserId: userId }),
    setStatusTask: (statusTask)=> set({ statusTask }),
    setTaskEdit: (taskEdit)=> set({ taskEdit }),
    setTaskSubmissionId: (taskSubmissionId)=> set({ taskSubmissionId }),
    setTask: (task: TaskDetails)=> set({ task }),
    setStudentId: (studentId)=> set({ studentId }),
    setTeacherId: (teacherId)=> set({ teacherId }),
    setteachersClases: (group)=> set({ teachersClases: group }),
    setTaskGraded: (taskGraded)=> set({ taskGraded })
}))