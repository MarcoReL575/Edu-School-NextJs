import { db } from "@/src/db"
import { clases, group, horarios, subjects, teachers } from "@/src/db/schema"
import { ClasesInfoComplete, ClasesInsertType, ClasesSelectType, ClassesByGroup, GroupCompleteInfo, HorariosClases, HorariosInsertType, HorariosSelectType } from "../types/types"
import { asc, eq } from "drizzle-orm";
import { TeachersClases } from "../../teachers/types/types";


export interface IClasesRepository {
    createClase(input: ClasesInsertType): Promise<void>;
    findClaseById(subjectId: string, groupId: string): Promise<boolean>;
    selectAllClases(): Promise<ClasesInfoComplete[]>;
    selectClaseById(claseId: string): Promise<ClasesInfoComplete>;
    selectClasesByGroup(groupId: string): Promise<ClassesByGroup[]>;
    selectClasesByTeachersId(teacherId: string): Promise<TeachersClases[]>;
    selectHorarioById(horarioId: string): Promise<HorariosSelectType>;
    selectHorarios(claseId: string): Promise<HorariosSelectType[]>;
    deleteHorario(horarioId: string): Promise<void>;
    createHorario(input: HorariosInsertType): Promise<void>;
    setHorario(input: HorariosSelectType): Promise<void>;
    selectAllInfoByGroup(groupId: string): Promise<GroupCompleteInfo[]>;
}

class ClasesRepository implements IClasesRepository {
    
    async createClase(input: ClasesInsertType): Promise<void> {
        const { groupId, subjectId, teacherId } = input;
        await db
            .insert(clases)
            .values({
                groupId,
                subjectId,
                teacherId
            })
    }

    async findClaseById(subjectId: string, groupId: string): Promise<boolean>{
        const clase = await db
            .query
            .clases
            .findFirst({
                where: (clases, { eq, and}) => (and(
                    eq(clases.subjectId, subjectId),
                    eq(clases.groupId, groupId)
                )),   
            })
        return !!clase
    }

    async selectAllClases(): Promise<ClasesInfoComplete[]> {
        const result = await db
            .select({
                id: clases.id,
                subject: subjects.name,
                teacher: teachers.name,
                group: group.group,
                grado: group.grade,
                level: group.level
            })
            .from(clases)
            .innerJoin( subjects, eq(clases.subjectId, subjects.id))
            .innerJoin( teachers, eq(clases.teacherId, teachers.id))
            .innerJoin(  group, eq(clases.groupId, group.id) )
        return result
    }

    async selectClaseById(claseId: string): Promise<ClasesInfoComplete> {
        const [result] = await db
            .select({
                id: clases.id,
                subject: subjects.name,
                teacher: teachers.name,
                group: group.group,
                grado: group.grade,
                level: group.level,
            })
            .from(clases)
            .innerJoin(subjects, eq(clases.subjectId, subjects.id))
            .innerJoin(teachers, eq(clases.teacherId, teachers.id))
            .innerJoin(group, eq(clases.groupId, group.id) )
            .where( eq(clases.id, claseId) )
        return result
    }

    async selectClasesByGroup(groupId: string): Promise<ClassesByGroup[]> {
        const result = await db
            .select({
                id: clases.id,
                subjectName: subjects.name,
                teachersName: teachers.name,
                teachersLastname: teachers.lastName,
            })
            .from(clases)
            .leftJoin(teachers, eq(clases.teacherId, teachers.id))
            .leftJoin(subjects, eq(clases.subjectId, subjects.id))
            .where(eq(clases.groupId, groupId ))
        return result
    }

    async selectClasesByTeachersId(teacherId: string): Promise<TeachersClases[]> {
        const clasesList = await db
            .select({
                id: clases.id,
                subjectName: subjects.name,
                grade: group.grade,
                group: group.group,
                level: group.level
            })
            .from(clases)
            .where(eq(clases.teacherId, teacherId))
            .innerJoin(subjects, eq(subjects.id, clases.subjectId))
            .innerJoin(group, eq (group.id, clases.groupId))
        return clasesList;
    }

    async selectHorarioById(horarioId: string): Promise<HorariosSelectType> {
        const [horario] = await db
            .select()            
            .from(horarios)
            .where(eq(horarios.id, horarioId))
        return horario
    }

    async deleteHorario(horarioId: string): Promise<void> {
        await db
            .delete(horarios)
            .where(eq(horarios.id, horarioId))
    }
    
    async selectHorarios(claseId: string): Promise<HorariosSelectType[]> {
        const result = await db
            .select({
                id: horarios.id,
                dayOfWeek: horarios.dayOfWeek,
                startTime: horarios.startTime,
                endTime: horarios.endTime,
                claseId: horarios.claseId
            })
            .from(clases)
            .innerJoin( horarios, eq(clases.id, horarios.claseId) )
            .where(eq (clases.id, claseId))
        return result
    }

    async createHorario(input: HorariosInsertType): Promise<void> {
        const { dayOfWeek, startTime, endTime, claseId } = input;
        await db
            .insert(horarios)
            .values({
                dayOfWeek,
                startTime,
                endTime,
                claseId
            });
    }   

    async setHorario(input: HorariosSelectType): Promise<void> {
        console.log(input)
        const { dayOfWeek, startTime, endTime, claseId } = input;
        await db
            .update(horarios)
            .set({
                dayOfWeek,
                startTime,
                endTime,
                claseId
            })
            .where(eq(horarios.id, input.id))
    }


    async selectAllInfoByGroup(groupId: string): Promise<GroupCompleteInfo[]> {
        const groupInfo = await db
            .select({
                claseId:      clases.id,
                subjectName:  subjects.name,
                subjectsLevel: subjects.nivelAcademico,
                teacherFirst: teachers.name,
                teacherLast:  teachers.lastName,
                dayOfWeek:    horarios.dayOfWeek,
                startTime:    horarios.startTime,
                endTime:      horarios.endTime,
            })
            .from(clases)
            .innerJoin(group, eq(group.id, groupId))
            .innerJoin(subjects, eq(subjects.id, clases.subjectId))
            .leftJoin(horarios, eq(horarios.claseId, clases.id))
            .innerJoin(teachers, eq(teachers.id, clases.teacherId))
            .where(eq(clases.groupId, groupId))
            .orderBy(asc(horarios.dayOfWeek), asc (horarios.startTime))
        
            return groupInfo
    }

}

export const clasesRepository = new ClasesRepository()