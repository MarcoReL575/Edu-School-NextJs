import { IUsersRepository, usersRepository } from "./UsersRepository";

class UsersService {
    constructor(
        private  usersRepository: IUsersRepository,
    ){}

    async getAllTeachers() {
        return await this.usersRepository.selectAllTeachers();
    }

    async getInfoStudent(userId: string) {
        return await this.usersRepository.selectInfoStudents(userId);
    }
}

export const usersService = new UsersService(usersRepository);