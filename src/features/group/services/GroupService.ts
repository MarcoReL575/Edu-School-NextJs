import { GroupInsertType, GroupSelectType } from "../types/types";
import { groupRepository, IGroupRepository } from "./GroupRepository";


class GroupService {
    constructor(
        private groupRepository: IGroupRepository
    ){}

    async getAllGroups() {
        const groups = await this.groupRepository.selectGroups();
        return groups;
    }

    async getActualGroupStudent(groupId: string) {
        return await this.groupRepository.selectActualGroupByStudentId(groupId);
    }

    async assigntoAGroup(studentId: string, groupId: string) {
        await this.groupRepository.editGroupStudnet(studentId, groupId)
        return { success: true, message: 'El grupo fue asignado' }
    }

    async updateGroup(group: GroupSelectType) {
        await this.groupRepository.setGroup(group);
        return { success: true, message: 'El grupo fue editado' }
    }

    async createGroup(group: GroupInsertType) {
        await this.groupRepository.insertGroup(group);
        return { success: true, message: 'El grupo fue creado' }
    }

    async deleteGroup(groupdId: string){
        await this.groupRepository.deleteGroup(groupdId)
        return { success: true, message: 'El grupo fue eliminado' }
    }

}

export const groupService = new GroupService(groupRepository)