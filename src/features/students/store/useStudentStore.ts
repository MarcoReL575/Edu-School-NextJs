import { create } from 'zustand'
import { CreateStudent } from '../schemas/studentsSchemas';


interface StudentStore {
    currentStudent: CreateStudent;
    setStudent: (student: CreateStudent)=> void;
}

export const useStudentStore = create<StudentStore>()((set) => ({
    currentStudent: {} as CreateStudent,
    setStudent: (student: CreateStudent)=> set({ currentStudent: student })
}))
