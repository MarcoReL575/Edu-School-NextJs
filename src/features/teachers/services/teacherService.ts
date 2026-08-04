import { ITeacherRepository, teacherRepository } from "./teacherRepository";
import { TeachersInsertType, TeachersSelectType } from "../types/types";
import { clasesRepository, IClasesRepository } from "../../clases/services/ClasesRepository";
import { getTodayDayName } from "../../tasks/helpers/getActualDay";
import { NewTeacherSchema } from "../schema/schema";

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
       return await this.clasesRepository.selectClaseBySlug(claseId);
    }

    async getActualHorarioTeacherClases(teacherId: string) {
        // const todayName = getTodayDayName();  
        const todayName = 'jueves' 
        try {
            return await this.teacherRepository.selectTeacherClases(teacherId, todayName);
        } catch (error) {
        } 
    }

    async getAllTechaersList() {
        try {
            const teachers = await this.teacherRepository.selectAllTeachers()
            return { success: true, message: '', teachers }
        } catch (error) {
            return { success: false, message: 'Hubo un error al obtener la lista de maestros', teachers: [] as TeachersSelectType[] }
        }
    }

    async createNewTeacher(infoTeacher: TeachersInsertType) {
        try {
            const { success, data } = NewTeacherSchema.safeParse(infoTeacher);
            if(!success) return { success: false, message: 'Error en las datos de validación' }

            await this.teacherRepository.insertNewTeacher(data);
            return { success: true, message: 'El maestro fue añadido correctamente' }
        } catch (error) {
            return { success: false, message: 'Error al agregar maestro' }
        }
    }

    async getTeacherInfo(slug: string) {
        try {
            const teacherInfo = await this.teacherRepository.selectTeacherBySlug(slug);
            return { success: true, message: '', teacherInfo }
        } catch (error) {
            return { success: false, message: 'Error al agregar maestro', teacherInfo: {} as TeachersSelectType }
        }
    }

    async updateInfoTeacher(infoTeacher: TeachersInsertType, slugOld: string) {
        try {
            const { success, data } = NewTeacherSchema.safeParse(infoTeacher);
            if(!success) return { success: false, message: 'Error en las datos de validación' }

            await this.teacherRepository.setTeacherInfo(data, slugOld);
            return { success: true, message: 'Los datos fueron actualizados' }
        } catch (error) {
            return { success: false, message: 'Error al editar la información' }
        }
    }

    async deleteTeacher(slug: string) {
        try {
            await this.teacherRepository.deleteTeacher(slug);
            return { success: true, message: 'El maestro se ha eliminado' }
        } catch (error) {
            return { success: false, message: 'Error al eliminar al maestro' }
        }
    }
}

export const teacherService = new TeacherService(teacherRepository, clasesRepository);