import { db } from "@/src/db";
import { DaysOfWeek, InfoHorariosTechaer, TeachersInsertType, TeachersSelectType } from "../types/types";
import { clases, group, horarios, subjects, teachers } from "@/src/db/schema";
import { and, asc, desc, eq } from "drizzle-orm";

export interface ITeacherRepository {
    selectById(userId: string): Promise<TeachersSelectType>;
    selectTeacherClases(teacherId: string, todayName:DaysOfWeek): Promise<InfoHorariosTechaer[]>;
    selectAllTeachers(): Promise<TeachersSelectType[]>;
    insertNewTeacher(infoTeacher: TeachersInsertType): Promise<void>;
    selectTeacherBySlug(slug: string): Promise<TeachersSelectType>;
    setTeacherInfo(infoTeacher: TeachersInsertType, slugOld: string): Promise<void>;
}

class TeacherRepository implements ITeacherRepository {
    async selectById(userId: string): Promise<TeachersSelectType> {
        const [teacher] = await db
            .select()
            .from(teachers)
            .where(eq(teachers.userId, userId))
        return teacher;
    }
    
    async selectTeacherClases(teacherId: string, todayName: DaysOfWeek): Promise<InfoHorariosTechaer[]> {
        const todaySchedule = await db
            .select({
                claseId: clases.id,
                slug: clases.slug,
                subjectName: subjects.name,
                grade: group.grade,
                groupName: group.group,
                level: group.level,
                dia: horarios.dayOfWeek,
                inicio: horarios.startTime,
                fin: horarios.endTime,
            })
            .from(clases)
            .innerJoin(horarios, eq(clases.id, horarios.claseId))
            .innerJoin(subjects, eq(clases.subjectId, subjects.id))
            .innerJoin(group, eq(clases.groupId, group.id))
            .where(
                and(
                    eq(clases.teacherId, teacherId),
                    eq(horarios.dayOfWeek, todayName)
                )
            )
            .orderBy(horarios.startTime); // Ordena las clases por hora de inicio
        return todaySchedule;
    }

    async selectAllTeachers(): Promise<TeachersSelectType[]> {
        const result = await db
            .select()
            .from(teachers)
            .orderBy(
                desc(teachers.level),
                teachers.lastName
            )
        return result
    }

    async insertNewTeacher(infoTeacher: TeachersInsertType): Promise<void> {
        const { lastName, name, level, slug } = infoTeacher
        await db
            .insert(teachers)
            .values({
                lastName,
                name,
                level,
                slug
            })
    }

    async selectTeacherBySlug(slug: string): Promise<TeachersSelectType> {
        const [teacher] = await db
            .select()
            .from(teachers)
            .where(eq(teachers.slug, slug))
        return teacher;
    }

    async setTeacherInfo(infoTeacher: TeachersInsertType, slugOld: string): Promise<void> {
        console.log(infoTeacher);
        const { name, lastName, level, slug } = infoTeacher;
        await db
            .update(teachers)
            .set({
                name, 
                lastName, 
                level, 
                slug
            })
            .where(eq(teachers.slug, slugOld))
    }

}

export const teacherRepository = new TeacherRepository();