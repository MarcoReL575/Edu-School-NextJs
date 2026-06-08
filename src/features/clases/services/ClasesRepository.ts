import { db } from "@/src/db"
import { clases, group, horarios, subjects, teachers } from "@/src/db/schema"
import { ClasesInfoByAttendance, ClasesInfoComplete, ClasesInsertType, ClasesSelectType, ClassesByGroup, GroupCompleteInfo, HorariosInsertType, HorariosSelectType } from "../types/types"
import { asc, eq } from "drizzle-orm";
import { TeachersClases, TeachersClasesAllInfo } from "../../teachers/types/types";


export interface IClasesRepository {
    createClase(input: ClasesInsertType, slug: string): Promise<void>;
    findClaseById(subjectId: string, groupId: string): Promise<boolean>;
    selectAllClases(): Promise<ClasesInfoComplete[]>;
    selectClaseById(claseId: string): Promise<ClasesInfoComplete>;
    selectClaseAttendance(slug: string): Promise<ClasesInfoByAttendance | null>;
    selectClasesByGroup(groupId: string): Promise<ClassesByGroup[]>;
    selectClasesByTeachersId(teacherId: string): Promise<TeachersClases[]>;
    selectAllInfoTeachersClases(slug: string): Promise<TeachersClasesAllInfo>
    selectHorarioById(horarioId: string): Promise<HorariosSelectType>;
    selectHorarios(claseId: string): Promise<HorariosSelectType[]>;
    deleteHorario(horarioId: string): Promise<void>;
    createHorario(input: HorariosInsertType): Promise<void>;
    setHorario(input: HorariosSelectType): Promise<void>;
    selectAllInfoByGroup(groupId: string): Promise<GroupCompleteInfo[]>;
    selectClaseBySlug(slug: string): Promise<ClasesSelectType>;
}

class ClasesRepository implements IClasesRepository {
    
    async createClase(input: ClasesInsertType, slug: string): Promise<void> {
        const { groupId, subjectId, teacherId } = input;
        await db
            .insert(clases)
            .values({
                groupId,
                slug,
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

    async selectClaseAttendance(slug: string): Promise<ClasesInfoByAttendance | null> {
        const result = await db.query.clases.findFirst({
            where: eq(clases.slug, slug),
            with: {
                group: {
                    with: {
                        students: {
                            with: {
                                attendance: {
                                    columns: {
                                        status: true
                                    }
                                }
                            }
                        }
                    },
                },
                subject: true,
            }
        });
       
       if(!result) return null

       return {
            subjectName: result.subject.name, 
            grade: result.group.grade,
            group: result.group.group,
            level: result.group.level,
            students: result.group.students.map((student)=> ({
                ...student,
                attendance: student.attendance?.status ?? 'falta'
            }))
        };
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
                slug: clases.slug,
                subjectName: subjects.name,
                grade: group.grade,
                group: group.group,
                level: group.level,
            })
            .from(clases)
            .where(eq(clases.teacherId, teacherId))
            .innerJoin(subjects, eq(subjects.id, clases.subjectId))
            .innerJoin(group, eq (group.id, clases.groupId))
        return clasesList;
    }

    async selectAllInfoTeachersClases(slug: string): Promise<TeachersClasesAllInfo> {
        const [teachersClases] = await db
            .select({
                id: clases.id,
                slug: clases.slug,
                subjectName: subjects.name,
                grade: group.grade,
                group: group.group,
                level: group.level,
                teacherName: teachers.name,
                teacherLastName: teachers.lastName
            })
            .from(clases)
            .innerJoin(subjects, eq(subjects.id, clases.subjectId))
            .innerJoin(group, eq(group.id, clases.groupId))
            .innerJoin(teachers, eq(teachers.id, clases.teacherId))
            .where(eq(clases.slug, slug))
        return teachersClases
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

    async selectClaseBySlug(slug: string): Promise<ClasesSelectType> {
        const [result] = await db 
            .select()
            .from(clases)
            .where(eq(clases.slug, slug))
        return result
    }

}

export const clasesRepository = new ClasesRepository()