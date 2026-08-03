import { db } from "@/src/db";
import { DaysOfWeek, InfoHorariosTechaer, TeachersSelectType } from "../types/types";
import { clases, group, horarios, subjects, teachers } from "@/src/db/schema";
import { and, eq } from "drizzle-orm";

export interface ITeacherRepository {
    selectById(userId: string): Promise<TeachersSelectType>;
    selectTeacherClases(teacherId: string, todayName:DaysOfWeek): Promise<InfoHorariosTechaer[]>;
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
}

export const teacherRepository = new TeacherRepository();