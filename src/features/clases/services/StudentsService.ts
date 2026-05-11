import { db } from "@/src/db";
import { GroupSelectType, StudentsInsertType, StudentsSelectType, StudentsTable } from "../types/types";
import { groupRepository, IGroupRepository } from "./GroupRepository";
import { IStudentsRepository, studentsRepository } from "./StudentsRepository";
import { CreateStudent } from "../schema/clasesSchemas";

class StudentsService {
    constructor(
        private studentsRepository: IStudentsRepository,
        private groupRepository: IGroupRepository
    ){};
    
    async studentsExists(userId: string) {
        const exists = await this.studentsRepository.selectStudentById(userId);
        return exists;
    }

    async getAllStudents() {
        return await this.studentsRepository.selectAllStudents();
    }

    async getInfoStudentById(userId: string) {
        return await  this.studentsRepository.selectInfoStudent(userId);
    }

    async createStudent(student: CreateStudent) {
        return await this.studentsRepository.createStudent(student);
    }

    async editStudent(student: StudentsInsertType) {
        if(student.id === undefined) return { success: true, message: 'Usuario actualizado' }

        await this.studentsRepository.setStudent(student);
        return { success: true, message: 'Usuario actualizado' }
    }

    async getInfoStudentAndGroup(userId: string): Promise<{student: StudentsSelectType, group: GroupSelectType }>{
        const studentsExists = await this.studentsExists(userId); 
        if(!studentsExists.groupId) return { student: {} as StudentsSelectType, group: {} as GroupSelectType}

        const groupStudent = await this.groupRepository.selectActualGroupByStudentId(studentsExists.groupId);
        return {
            student: studentsExists,
            group: groupStudent
        }
    }

    async delteStudent(studentId: string) {
        const studentsExists = await this.studentsExists(studentId); 
        if(!studentsExists.groupId) return { success: true, message: 'El estudiante no existe' }

        await this.studentsRepository.deleteStudentById(studentId);
    }

};

export const studentsService = new StudentsService(studentsRepository, groupRepository);