import { eq } from "drizzle-orm";
import { db } from "@/src/db";
import { clases, group, students, user } from "@/src/db/schema";
import { GroupInsertType, GroupSelectType } from "../types/types"

export interface IGroupRepository {
    selectGroups(): Promise<GroupSelectType[]>;
    insertGroup(groupInput: GroupInsertType): Promise<void>;
    deleteGroup(groupId: string): Promise<void>;
    setGroup(groupInput: GroupSelectType): Promise<void>;
    editGroupStudnet(studentId: string, groupId: string): Promise<void>;
    selectActualGroupByStudentId(groupId: string): Promise<GroupSelectType>;
    selectGroupByClaseId(claseId: string): Promise<GroupSelectType>;
}

class GroupRepository implements IGroupRepository {
    async selectGroups(): Promise<GroupSelectType[]> {
        const result = await db
            .select()
            .from(group)
        
        return result;
    }

    async insertGroup(groupInput: GroupInsertType): Promise<void> {
        await db
            .insert(group)
            .values(groupInput)
    }

    async deleteGroup(groupId: string): Promise<void> {
        await db
            .delete(group)
            .where(eq(group.id, groupId))
    }

    async setGroup(groupInput: GroupSelectType): Promise<void> {
        await db
            .update(group)
            .set({
                grade: groupInput.grade,
                group: groupInput.group,
                level: groupInput.level
            })
            .where(eq(group.id, groupInput.id))
    }

    async editGroupStudnet(studentId: string, groupId: string): Promise<void> {
        await db
            .update(students)
            .set({
                groupId
            })
            .where(eq(students.id, studentId))
    }

    async selectActualGroupByStudentId(groupId: string): Promise<GroupSelectType> {
        const [result] = await db
            .select()
            .from(group)
            .where(eq(group.id, groupId))
        return result;
    }

    async selectGroupByClaseId(claseId: string): Promise<GroupSelectType> {
        const [groupInfo] =  await db
            .select({
                id: group.id,
                grade: group.grade,
                group: group.group,
                level: group.level
            })
            .from(group)
            .innerJoin(clases, eq(clases.groupId, group.id))
            .where(eq(clases.id, claseId))
        return groupInfo;
    }
}

export const groupRepository = new GroupRepository()