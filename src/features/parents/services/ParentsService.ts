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
}

export const parentsService = new ParentsService(parentsRepository);
