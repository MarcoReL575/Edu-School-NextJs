import { clasesRepository, IClasesRepository } from "./ClasesRepository";
import { ClasesInfoByAttendance, ClasesInfoComplete, ClasesInsertType, ClasesSelectType, HorariosInsertType, HorariosSelectType } from "../types/types";
import { ISubjectsRepository, subjectsRepository } from "./SubjectsRepository";
import { IGroupRepository, groupRepository } from "../../group/services/GroupRepository";

class ClasesServices {
    constructor(
        private clasesRepository: IClasesRepository,
        private subjectsRepository: ISubjectsRepository,
        private groupRepository: IGroupRepository
    ){}

    async getAllClasses() {
        const allClasses = await this.clasesRepository.selectAllClases();
        return allClasses
    }

    async classExists(subjectId: string, groupId: string) {
        const classExists = await this.clasesRepository.findClaseById(subjectId, groupId);
        return classExists
    }

    async createClass(input: ClasesInsertType) {
        //Verificar que la clase a crear no existe
        const classExists = await this.classExists(input.subjectId, input.groupId);
        if(classExists) return { success: false, message: 'La clase ya existe en este grupo' }

        const subjectName = await this.subjectsRepository.selectById(input.subjectId);
        const group = await this.groupRepository.selectGroup(input.groupId);

        const slug = `${subjectName.name}-${group.grade}-${group.group}`
            .normalize("NFD") // Separa los acentos de las letras (ej: í -> i + ´)
            .replace(/[\u0300-\u036f]/g, "") // Elimina los signos de acentuación
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-') // Reemplaza cualquier cosa que no sea alfanumérico por un guion
            .replace(/(^-|-$)/g, "");    // Elimina guiones al principio o al final
        
        await this.clasesRepository.createClase(input, slug);
        return { success: true, message: 'La clase fue creada' }
    }

    async claseById(claseId: string) {
        return await this.clasesRepository.selectClaseById(claseId);
    }

    async claseBySlug(slug: string) {
        try {
            const clase =  await this.clasesRepository.selectClaseInfoBySlug(slug);
            return { success: true, clase }
        } catch (error) {
            return { success: false, clase: {} as ClasesInfoComplete }
        }
    }

    async getAllClasessByGroup(groupId: string) {
        return await this.clasesRepository.selectAllInfoByGroup(groupId);
    }

    async getClasesByStudents(groupId: string, studentId: string) {
        return await this.clasesRepository.selectClasesByGroup(groupId, studentId);
    }
    
    async createHorario(input: HorariosInsertType) {
        await this.clasesRepository.createHorario(input);
        return { success: true, message: 'El horario fue creado' }
    }
    
    async editHorario(horario: HorariosSelectType) {
        await this.clasesRepository.setHorario(horario)
    }

    async existsHorario(horarioId: string): Promise<boolean> {
        const horarioExists = await this.clasesRepository.selectHorarioById(horarioId);
        return !!horarioExists
    }

    async deleteHorarioClase(horarioId: string) {
        const horarioExists = await this.existsHorario(horarioId);
        if(!horarioExists) return { success:false, message:'El horario no existe' }

        await this.clasesRepository.deleteHorario(horarioId);
    }

    async getHorarios(claseId: string) {
        try {
            const horarios = await this.clasesRepository.selectHorarios(claseId);
            return { success: true, message: '', horarios }
        } catch (error) {
            return { success: false, message: 'Error al obtener la información', horarios: [] }
        }
    }

    async getInfoClasesAttendance(slug: string) {
        try {
            const infoClases = await this.clasesRepository.selectClaseAttendance(slug);
            return { success: true, message: '', infoClases }
        } catch (error) {
            return { success: false, message: 'Error al obtener la información', infoClases: {} as ClasesInfoByAttendance }
        }
    }

    async getInfoClaseBySlug(slug: string) {
        try {
            const clase = await this.clasesRepository.selectClaseBySlug(slug);
            return { success: true, message: '', clase }
        } catch (error) {
            return { success: true, message: '', clase: {} as ClasesSelectType }
        }
    }
}

export const clasesServices = new ClasesServices(clasesRepository, subjectsRepository, groupRepository);