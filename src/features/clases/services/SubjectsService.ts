import { ISubjectsRepository, subjectsRepository } from "./SubjectsRepository";

class SubjectsService {
    constructor(
        private subjectsRepository: ISubjectsRepository
    ){}

    async getAllSubjects() {
        return await this.subjectsRepository.selectAll();
    }
};

export const subjectsService = new SubjectsService(subjectsRepository);