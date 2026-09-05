import { db } from "@/src/db";
import { ExamSelectInfo, ExamStudentInfo, ExamWithResult, FullExamWithAnswers, InsertExamWithQuestions, SelectExam, SelectExamubmissions, StudentExamRender, StudentRowData, StudentsSubmissions } from "../types/types";
import { examQuestionOptions, examQuestions, exams, examSubmissions } from "@/src/db/schema/examen-schema";
import { and, avg, desc, eq, sql } from "drizzle-orm";
import { clases, classGrades, group, students, subjects } from "@/src/db/schema";
import { studentExamRenderSchema } from "../schemas/schema";

export interface IExamRepository {
    runTransaction<T>(fn: (tx: any) => Promise<T>): Promise<T>;
    createExamTransaction(dataExam: InsertExamWithQuestions): Promise<SelectExam>;
    deletExam(examId: string, teacherId: string): Promise<void>;
    selectExams(teacherId: string): Promise<ExamSelectInfo[]>;
    selectExamsByClass(claseId: string, teacherId: string): Promise<ExamSelectInfo[]>;
    selectExamListStudents(studentId: string, groupId: string): Promise<ExamStudentInfo[]>;
    selectExam(examSlug: string): Promise<StudentExamRender | undefined>;
    selectExamWithAnswers(examSlug: string): Promise <FullExamWithAnswers | undefined>;
    submitExam(examData: FullExamWithAnswers, finalScore:number, studentId: string, tx: any): Promise<void>;
    submittedExam(examId: string, studentId: string): Promise<SelectExamubmissions | undefined>;
    selectStudentsWithSubmissions(groupId: string, examId: string): Promise<StudentsSubmissions>;
    selectExamWithResult(studentId: string, subjectName: string): Promise<ExamWithResult[]>;
    recalculateSubjectAverage(studentId: string, claseId: string, tx: any): Promise<void>;
}

class ExamRepository implements IExamRepository {
    async runTransaction<T>(fn: (tx: any) => Promise<T>): Promise<T> {
        return await db.transaction(fn);
    }

    async createExamTransaction(dataExam: InsertExamWithQuestions): Promise<SelectExam> {
        const { questions, ...examData } = dataExam;

        return await db.transaction(async (tx) => {
            const [newExam] = await tx.insert(exams).values(examData).returning();

            for (const question of questions) {
                const [newQuestion] = await tx.insert(examQuestions).values({
                    examId: newExam.id,
                    questionText: question.questionText,
                    type: question.type,
                    points: question.points,
                }).returning();

                if (question.options.length > 0) {
                    await tx.insert(examQuestionOptions).values(
                        question.options.map((opt) => ({
                            questionId: newQuestion.id,
                            text: opt.text,
                            isCorrect: opt.isCorrect,
                        }))
                    );
                }
            }
            return newExam;
        });
    }

    async selectExams(teacherId: string): Promise<ExamSelectInfo[]> {
        const result = await db
            .select({
                id: exams.id,
                title: exams.title,
                slug: exams.slug,
                subjectName: exams.subjectName,
                grade: group.grade,
                group: group.group,
                level: group.level,
                status: exams.status,
                createdAt: exams.createdAt,
                // 1. Conteo de preguntas asociadas al examen
                questionsCount: sql<number>`count(distinct ${examQuestions.id})`.mapWith(Number),
                // 2. Alumnos totales pertenecientes al grupo de la clase
                totalStudents: sql<number>`(
                    select count(*) from ${students} 
                    where ${students.groupId} = ${clases.groupId}
                )`.mapWith(Number),
                // 3. Cantidad de alumnos que ya entregaron el examen
                submittedCount: sql<number>`(
                    select count(*) from ${examSubmissions} 
                    where ${examSubmissions.examId} = ${exams.id} 
                    and ${examSubmissions.status} = 'entregado'
                )`.mapWith(Number),
                // 4. Promedio general de calificación obtenido en el examen
                averageScore: sql<number>`coalesce(
                    (select avg(${examSubmissions.score}) 
                    from ${examSubmissions} 
                    where ${examSubmissions.examId} = ${exams.id}
                    and ${examSubmissions.status} = 'entregado'), 0
                )`.mapWith(Number)
            })
            .from(exams)
            .leftJoin(clases, eq(exams.claseId, clases.id))
            .leftJoin(subjects, eq(clases.subjectId, subjects.id))
            .leftJoin(group, eq(clases.groupId, group.id))
            .leftJoin(examQuestions, eq(exams.id, examQuestions.examId))
            .where(eq(exams.teacherId, teacherId))
            .groupBy(
                exams.id, 
                exams.title,
                exams.slug,
                exams.status,
                exams.createdAt,
                clases.groupId,
                group.grade, 
                group.group, 
                group.level
            )
            .orderBy(desc(exams.createdAt));
        return result
    }

    async selectExamsByClass(claseId: string, teacherId: string): Promise<ExamSelectInfo[]> {
        const result = await db
            .select({
                id: exams.id,
                title: exams.title,
                slug: exams.slug,
                subjectName: exams.subjectName,
                grade: group.grade,
                group: group.group,
                level: group.level,
                status: exams.status,
                createdAt: exams.createdAt,
                // 1. Conteo de preguntas asociadas al examen
                questionsCount: sql<number>`count(distinct ${examQuestions.id})`.mapWith(Number),
                // 2. Alumnos totales pertenecientes al grupo de la clase
                totalStudents: sql<number>`(
                    select count(*) from ${students} 
                    where ${students.groupId} = ${clases.groupId}
                )`.mapWith(Number),
                // 3. Cantidad de alumnos que ya entregaron el examen
                submittedCount: sql<number>`(
                    select count(*) from ${examSubmissions} 
                    where ${examSubmissions.examId} = ${exams.id} 
                    and ${examSubmissions.status} = 'entregado'
                )`.mapWith(Number),
                // 4. Promedio general de calificación obtenido en el examen
                averageScore: sql<number>`coalesce(
                    (select avg(${examSubmissions.score}) 
                    from ${examSubmissions} 
                    where ${examSubmissions.examId} = ${exams.id}
                    and ${examSubmissions.status} = 'entregado'), 0
                )`.mapWith(Number)
            })
            .from(exams)
            .leftJoin(clases, eq(exams.claseId, clases.id))
            .leftJoin(subjects, eq(clases.subjectId, subjects.id))
            .leftJoin(group, eq(clases.groupId, group.id))
            .leftJoin(examQuestions, eq(exams.id, examQuestions.examId))
            .where(and(
                eq(exams.claseId, claseId),
                eq(exams.teacherId, teacherId)
            ))
            .groupBy(
                exams.id, 
                exams.title,
                exams.slug,
                exams.status,
                exams.createdAt,
                clases.groupId,
                group.grade, 
                group.group, 
                group.level
            )
            .orderBy(desc(exams.createdAt));
        return result
    }


    async selectExamListStudents(studentId: string, groupId: string): Promise<ExamStudentInfo[]> {
        const result = await db 
            .select({
                id: exams.id,
                slug: exams.slug,
                title: exams.title,
                subjectName: exams.subjectName,
                status: exams.status, // 'activo' o 'concluido' general de la escuela
                createdAt: exams.createdAt,
                questionsCount: sql<number>`count(distinct ${examQuestions.id})`.mapWith(Number),
      
                // Datos del grupo para el Badge superior de la tarjeta
                grade: group.grade,
                groupName: group.group,
                level: group.level,

                // Estado de entrega particular de ESTE alumno
                studentSubmissionStatus: examSubmissions.status, // 'en_progreso', 'entregado' o null si no ha iniciado
                studentScore: examSubmissions.score, // Su calificación individual
                submittedAt: examSubmissions.submittedAt
            })
            .from(exams)
            .innerJoin(clases, eq(exams.claseId, clases.id))
            .leftJoin(group, eq(clases.groupId, group.id))
            .leftJoin(examQuestions, eq(exams.id, examQuestions.examId))
            .leftJoin(
                examSubmissions, 
                and(
                    eq(exams.id, examSubmissions.examId),
                    eq(examSubmissions.studentId, studentId)
                )
            )
            .where(
                and(
                    eq(exams.groupId, groupId),
                    sql`${exams.status} != 'borrador'`
                )
            )
            .groupBy(
                exams.id, 
                group.grade, 
                group.group, 
                group.level, 
                examSubmissions.id
            )
            .orderBy(exams.createdAt);
        return result;
    }

    async selectExam(examSlug: string): Promise<StudentExamRender | undefined> {
        const exam = await db.query.exams.findFirst({
            where: eq(exams.slug, examSlug),
            with: {
                questions: {
                    with: {
                        options: true
                    }
                }
            }
        })
        if (!exam) return undefined;
        return studentExamRenderSchema.parse(exam)
    }

    async selectExamWithAnswers(examSlug: string): Promise< FullExamWithAnswers| undefined> {
        const exam = await db.query.exams.findFirst({
            where: eq(exams.slug, examSlug),
            with: {
                questions: {
                    with: {
                        options: true
                    }
                }
            }
        })
        if (!exam) return undefined;
        return exam
    }

    async submitExam(examData: FullExamWithAnswers, finalScore:number, studentId: string, tx: any): Promise<void> {
        await tx.insert(examSubmissions).values({
            examId: examData.id,
            studentId: studentId,
            score: finalScore.toString(),
            status: 'entregado',
            submittedAt: new Date(),
        });
    }

    async submittedExam(examId: string, studentId: string): Promise<SelectExamubmissions | undefined> {
        const exists = await db.query.examSubmissions.findFirst({
            where: and(
                eq(examSubmissions.examId, examId),
                eq(examSubmissions.studentId, studentId)
            )
        })
        if (!exists) return undefined;
        return exists
    }

    async deletExam(examId: string, teacherId: string): Promise<void> {
        await db
            .delete(exams)
            .where(and(
                eq(exams.id, examId),
                eq(exams.teacherId, teacherId)
            ))
    }

    async selectStudentsWithSubmissions(groupId: string, examId: string): Promise <StudentsSubmissions> {
        const studentsSubmissions = await db.query.students.findMany({
            where: eq(students.groupId, groupId ),
            with: {
                examSubmissions: {
                    where: eq(examSubmissions.examId, examId)
                },
            }
        })
        return studentsSubmissions
    }

    async selectExamWithResult(studentId: string, subjectName: string): Promise<ExamWithResult[]> {
        const result = await db
            .select({
                examId: exams.id,
                title: exams.title,
                createdAt: exams.createdAt,
                // Campos de la entrega del alumno (pueden ser null si no lo ha hecho)
                score: examSubmissions.score,
                statusSubmission: examSubmissions.status, // 'en_progreso', 'entregado'
                submittedAt: examSubmissions.submittedAt,
            })
            .from(exams)
            .leftJoin(examSubmissions, 
                and(
                    eq(examSubmissions.examId, exams.id), 
                    eq(examSubmissions.studentId, studentId)
                )
            )
            .where(eq(exams.subjectName, subjectName))
            .orderBy(desc(exams.createdAt))
        return result
    }

    async recalculateSubjectAverage(studentId: string, claseId: string, tx: any): Promise<void> {
        // 1. Obtener el promedio de todos los exámenes entregados por el alumno en ESTA clase
        const [result] = await tx
            .select({
                averageScore: avg(examSubmissions.score)
            })
            .from(examSubmissions)
            .innerJoin(exams, eq(examSubmissions.examId, exams.id))
            .where(
                and(
                    eq(examSubmissions.studentId, studentId),
                    eq(exams.claseId, claseId),
                    eq(examSubmissions.status, 'entregado')
                )
            );

        const newAverage = result?.averageScore ? parseFloat(Number(result.averageScore).toFixed(2)) : 0;

        // 2. Actualizar tu tabla consolidada (ej. enrollments o class_grades)
        // Nota: Reemplaza 'enrollments' por el nombre exacto de la tabla donde decidiste guardar la calificación final
        await tx
            .insert(classGrades) 
            .values({ 
                studentId: studentId,
                claseId: claseId,
                finalGrade: newAverage.toString(),
                updatedAt: new Date()
            })
            .onConflictDoUpdate({
                target: [classGrades.studentId, classGrades.claseId], // Llave única compuesta
                set: { 
                    finalGrade: newAverage.toString(),
                    updatedAt: new Date()
                }
            })
    }
}

export const examRepository = new ExamRepository();