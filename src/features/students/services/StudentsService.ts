import { StudentsAndScoresInfo, StudentsInsertType, StudentsSelectType } from "../types/types";
import { GroupSelectType } from "../../group/types/types";
import { groupRepository, IGroupRepository } from "../../group/services/GroupRepository";
import { IStudentsRepository, studentsRepository } from "./StudentsRepository";
import { CreateStudent } from "../schemas/studentsSchemas";

class StudentsService {
    constructor(
        private studentsRepository: IStudentsRepository,
        private groupRepository: IGroupRepository
    ){};
    
    async studentsExists(userId: string) {
        const exists = await this.studentsRepository.selectStudentById(userId);
        return exists;
    }

    async selectStudent(usrId: string) {
        try {
            const exists = await this.studentsRepository.selectStudentByUserId(usrId);
            console.log(exists)
            return exists
        } catch (error) {
            console.error(error);
            return {} as StudentsSelectType
        }
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

    async getStudentsInGroup(groupId: string) {
        try {
            const students = await this.studentsRepository.selectStudentsInGroup(groupId);
            return students
        } catch (error) {
            return [] as StudentsSelectType[]
        }
    }

    async getListStudentsWithScores(groupId: string, claseId: string) {
        try {
            const students = await this.studentsRepository.selectStudentsInfoInGroup(groupId, claseId)
            return students
        } catch (error) {
            return [] as StudentsAndScoresInfo[]
        }
    }

};

export const studentsService = new StudentsService(studentsRepository, groupRepository);