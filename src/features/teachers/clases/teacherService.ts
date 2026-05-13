import { ITeacherRepository, teacherRepository } from "./teacherRepository";
import { TeachersClases, TeachersSelectType } from "../types/types";
import { clasesRepository, IClasesRepository } from "../../clases/services/ClasesRepository";

class TeacherService {
    constructor(
        private teacherRepository: ITeacherRepository,
        private clasesRepository: IClasesRepository
    ){}

    async teacherExists(userId: string) {
        const isExists = await this.teacherRepository.selectById(userId);
        return !!isExists;
    }

    async getTeacherByUserId(userId: string) {
        const isExists = await this.teacherExists(userId);
        if(!isExists) return { success: false, message: 'El maestro no existe', teacher: {} as TeachersSelectType }

        const infoTechaer = await this.teacherRepository.selectById(userId);
        return { success: true, message: '', teacher: infoTechaer  }
    }

    async getTeachersClases(teacherId: string ) {

        const teachersClases = await this.clasesRepository.selectClasesByTeachersId(teacherId);
        return { success: true, message: '', clases: teachersClases };
    }

    async getAllInfoClase(claseId: string) {
       return await this.clasesRepository.selectAllInfoTeachersClases(claseId);
    }
}

export const teacherService = new TeacherService(teacherRepository, clasesRepository);