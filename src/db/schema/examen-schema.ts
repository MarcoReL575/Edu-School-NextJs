import { boolean, decimal, integer, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { teachers } from "./teachersSchema";
import { group } from "./groupSchema";
import { students } from "./studentsSchema";
import { clases } from "./clasesSchemas";

export const exams = pgTable('exams', {
    id: uuid('id').defaultRandom().primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    subjectName: text('subject_name').notNull(),
    status: varchar('status', { length: 20 }).default('activo').notNull(),
    slug: text('slug').notNull(),

    // Relación con el docente creador (Asumiendo tabla 'users' existente)
    teacherId: uuid('teacher_id').notNull().references(() => teachers.id),
    groupId: uuid('group_id').notNull().references(() => group.id),
    claseId: uuid('clase_id').notNull().references(() => clases.id),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const examQuestions = pgTable('exam_questions', {
    id: uuid('id').defaultRandom().primaryKey(),
    examId: uuid('exam_id')
        .notNull()
        .references(() => exams.id, { onDelete: 'cascade' }), // Si se borra el examen, se borran sus preguntas

    // Tipo de reactivo: 'opcion_multiple' o 'verdadero_falso'
    type: varchar('type', { length: 30 }).notNull(),
    questionText: text('question_text').notNull(),
    points: integer('points').default(10).notNull(), // Puntos individuales

    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const examQuestionOptions = pgTable('exam_question_options', {
    id: uuid('id').defaultRandom().primaryKey(),
    questionId: uuid('question_id')
        .notNull()
        .references(() => examQuestions.id, { onDelete: 'cascade' }), // Si se borra la pregunta, se borran sus opciones

    text: text('text').notNull(), // El texto de la opción (ej: "Falso", "Opción A")
    isCorrect: boolean('is_correct').default(false).notNull(), // Bandera para saber si es la respuesta correcta
});

// ==========================================
// NUEVA TABLA: ENTREGAS DE EXÁMENES
// ==========================================
export const examSubmissions = pgTable('exam_submissions', {
    id: uuid('id').defaultRandom().primaryKey(),
    examId: uuid('exam_id').notNull().references(() => exams.id, { onDelete: 'cascade' }),
    studentId: uuid('student_id').notNull().references(() => students.id, { onDelete: 'cascade' }),

    // Guardamos la calificación como numérico (ej. 84.50)
    score: decimal('score', { precision: 5, scale: 2 }),

    // Estatus: 'en_progreso', 'entregado'
    status: varchar('status', { length: 30 }).default('en_progreso').notNull(),

    startedAt: timestamp('started_at').defaultNow().notNull(),
    submittedAt: timestamp('submitted_at'),
});