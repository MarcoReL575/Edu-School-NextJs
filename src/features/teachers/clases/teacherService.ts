import { db } from "@/src/db";
import { ITeacherRepository, teacherRepository } from "./teacherRepository";
import { TeachersSelectType } from "../types/types";

class TeacherService {
    constructor(
        private teacherRepository: ITeacherRepository
    ){}

    async teacherExists(userId: string) {
        const isExists = await this.teacherRepository.selectById(userId);
        return !!isExists;
    }

    async getTeacherByUserId(userId: string) {
        const isExists = await this.teacherExists(userId);
        if(isExists) return { success: false, message: 'El maestro no existe', teacher: {} as TeachersSelectType }

        const infoTechaer = await this.teacherRepository.selectById(userId);
        return { success: true, message: '', teacher: infoTechaer  }
    }
}

export const teacherService = new TeacherService(teacherRepository);