import { clasesRepository, IClasesRepository } from "./ClasesRepository";
import { ClasesInsertType, HorariosInsertType, HorariosSelectType } from "../types/types";

class ClasesServices {
    constructor(
        private clasesRepository: IClasesRepository
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
        
        await this.clasesRepository.createClase(input);
        return { success: true, message: 'La clase fue creada' }
    }

    async claseById(claseId: string) {
        return await this.clasesRepository.selectClaseById(claseId);
    }

    async getAllClasessByGroup(groupId: string) {
        return await this.clasesRepository.selectAllInfoByGroup(groupId);
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
        return await this.clasesRepository.selectHorarios(claseId);
    }

    async getClasesByStudents(groupId: string) {
        return await this.clasesRepository.selectClasesByGroup(groupId)
    }

}

export const clasesServices = new ClasesServices(clasesRepository)