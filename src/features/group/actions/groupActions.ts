'use server'

import { requireAuth } from "@/src/lib/auth-server";
import { groupService } from "../services/GroupService";
import { GroupInsertType, GroupSelectType } from "../types/types";
import { CreateGroupSchema, UpdateGroupSchema } from "../schemas/groupSchemas";

export async function getAllGroupsAction() {
    return await groupService.getAllGroups();
}

export async function assignGroupToStudentAction(studentId: string, groupId: string) {
    const { session } = await requireAuth();
    if(session?.user.role !== 'admin') return { success: false, message: 'El usuario no tiene los permisos necesarios' };
    
    return await groupService.assigntoAGroup(studentId, groupId);
}

export async function getCurrentGroupByStudentAction(groupdId: string | null) {
    if(!groupdId) return {} as GroupSelectType;
    return await groupService.getActualGroupStudent(groupdId);
}

export async function setGroupAction(group: GroupSelectType) {
    const { session } = await requireAuth();
    if(session?.user.role !== 'admin') return { success: false, message: 'El usuario no tiene los permisos necesarios' };

    const response = UpdateGroupSchema.safeParse(group);
    if(!response.success) return { success: false, message: 'Error en la validación' };

    return await groupService.updateGroup(response.data);
}

export async function createGroupAction(group: GroupInsertType) {
    const { session } = await requireAuth();
    if(session?.user.role !== 'admin') return { success: false, message: 'El usuario no tiene los permisos necesarios' };

    const response = CreateGroupSchema.safeParse(group);
    if(!response.success) return { success: false, message: 'Error en la validación' };

    return await groupService.createGroup(response.data);
}

export async function deleteGroupAction(groupId: string) {
    const { session } = await requireAuth();
    if(session?.user.role !== 'admin') return { success: false, message: 'El usuario no tiene los permisos necesarios' };

    await groupService.deleteGroup(groupId)
    return { success: true, message: 'El grupo fue eliminado' }
}