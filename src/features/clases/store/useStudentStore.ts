import { create } from 'zustand'
import { StudentsInsertType, StudentsSelectType, StudentsTable } from '../types/types';
import { CreateStudent } from '../schema/clasesSchemas';


interface StudentStore {
    currentStudent: CreateStudent;
    setStudent: (student: CreateStudent)=> void;
}

export const useStudentStore = create<StudentStore>()((set) => ({
    currentStudent: {} as CreateStudent,
    setStudent: (student: CreateStudent)=> set({ currentStudent: student })
}))
