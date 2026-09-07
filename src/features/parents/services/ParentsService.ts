import { IParentsRepository, parentsRepository } from "./ParentsRepository";

class ParentsService {
    constructor(
        private parentsRepository: IParentsRepository
    ) {}

    async getChildrenByUserId(userId: string) {
        return await this.parentsRepository.selectChildrenByUserId(userId);
    }

    async getParentsUserIdByStudentIds(studentIds: string[]) {
        return await this.parentsRepository.selectParentsUserIdByStudentIds(studentIds);
    }

    async getParentByUserId(userId: string) {
        return await this.parentsRepository.selectParentByUserId(userId);
    }

    async linkChild(parentId: string, studentId: string) {
        const alreadyLinked = await this.parentsRepository.isStudentLinked(parentId, studentId);
        if (alreadyLinked) return { success: false, message: 'Este estudiante ya está vinculado a tu cuenta' };

        await this.parentsRepository.linkStudent(parentId, studentId);
        return { success: true, message: 'Estudiante vinculado correctamente' };
    }

    async replaceChild(parentId: string, oldStudentId: string, newStudentId: string) {
        const alreadyLinked = await this.parentsRepository.isStudentLinked(parentId, newStudentId);
        if (alreadyLinked) return { success: false, message: 'Este estudiante ya está vinculado a tu cuenta' };

        await this.parentsRepository.unlinkStudent(parentId, oldStudentId);
        await this.parentsRepository.linkStudent(parentId, newStudentId);
        return { success: true, message: 'Matrícula actualizada correctamente' };
    }
}

export const parentsService = new ParentsService(parentsRepository);
