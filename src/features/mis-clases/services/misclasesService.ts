import { IMisclasesRepository, misclasesRepository } from "./misclasesRepository";

class MisclasesService {
    constructor (
        private misclasesRepository: IMisclasesRepository
    ) {}
}

export const misclasesService = new MisclasesService(misclasesRepository);