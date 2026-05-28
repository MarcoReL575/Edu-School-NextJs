import z from "zod";
import { tasks } from "@/src/db/schema";
import { AttachmentSchema, CreateTaskSchema, GradeTaskSchema, StudentSubmissionSchema } from "../schemas/schemas";
import { taskAttachments } from "@/src/db/schema/taskAttachments-schema";
import { taskSubmission } from "@/src/db/schema/taskSubmissions-schema";

export type SubmitTaskStatus = 'pendiente' | 'entregada' | 'calificada' | 'retrasada' | null;

export type CreateTask = z.input<typeof CreateTaskSchema>;

export type TaskSelect = typeof tasks.$inferSelect;
export type TaskInsert = typeof tasks.$inferInsert;

export type TaskAttachmentSelect = typeof taskAttachments.$inferSelect;
export type TaskAttachmentInsert = typeof taskAttachments.$inferInsert;

export type TaskSubmissionSelect = typeof taskSubmission.$inferSelect;
export type TaskSubmissionInsert = typeof taskSubmission.$inferInsert;

export type StatusTask = 'pendiente' | 'en progreso' | 'terminada';

export type StudentSubmissionInput = z.infer<typeof StudentSubmissionSchema>;
export type AttachmentInput = z.infer<typeof AttachmentSchema>;

export type GradeTasks = z.infer<typeof GradeTaskSchema>;

export type TaskDetails = {
    id: string;
    subjectName: string;
    teacherName: string;
    teachersLastName: string;
    teacherUserId: string | null;
    taskId: number;
    taskTitle: string;
    taskDescription: string;
    taskFechaEntrega: Date;
    taskCreatedAt: Date;
    taskStatus: SubmitTaskStatus
    taskGrade: string | null,
    taskFeedback: string | null
}

export type TaskTeacher = {
    id: number;
    title: string;
    description: string;
    createdAt: Date;
    fechaEntrega: Date;
    status: StatusTask;
    claseId: string;
    subjectName: string;
    groupName: string;
    gradeName: string;
    level: string  
}


export type SubmitTasksStudents = {
    studentId: string;
    studentName: string;
    studentLastname: string;  
    submissionId: string | null;
    submissionStatus: SubmitTaskStatus;
    submittedAt: Date | null;
    calificacion: string | null;
    feedback: string | null;
    attachments: {
        id: string;
        fileUrl: string;
        fileName: string;
        fileType: string;
    }[] | null;
}

export type TaskInfoTeacher = {
    id: number;
    title: string;
    description: string;
    fechaEntrega: Date;
    createdAt: Date;
    status: StatusTask;
    groupId: string;
    subjectName: string;
    grade: string;
    level: string;
    group: string;
}
