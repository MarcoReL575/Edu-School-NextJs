import { IParentsRepository, parentsRepository } from "./ParentsRepository";

class ParentsService {
    constructor(
        private parentsRepository: IParentsRepository
    ) {}

    async getChildrenByUserId(userId: string) {
        return await this.parentsRepository.selectChildrenByUserId(userId);
    }
}

export const parentsService = new ParentsService(parentsRepository);
