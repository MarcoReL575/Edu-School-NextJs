import { bigint, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { taskSubmission } from "./taskSubmissions-schema";


export const taskAttachments = pgTable("task_attachments", {
    id: uuid("id").primaryKey().defaultRandom(),
    taskSubmissionId: uuid("taskSubmission_id").references(() => taskSubmission.id).notNull(),
    fileUrl: text("file_url").notNull(),   
    fileName: text("file_name").notNull(), 
    fileType: text("file_type").notNull(),   
    uploadedAt: timestamp("uploaded_at").defaultNow().notNull(),
});