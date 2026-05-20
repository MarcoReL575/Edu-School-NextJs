import { bigint, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { tasks } from "./tasks-schema";

export const taskAttachments = pgTable("task_attachments", {
    id: uuid("id").primaryKey().defaultRandom(),
    taskId: bigint("task_id", { mode: "number" })
        .references(() => tasks.id, { onDelete: "cascade" })
        .notNull(),
    fileUrl: text("file_url").notNull(),   
    fileName: text("file_name").notNull(), 
    fileType: text("file_type").notNull(),   
    uploadedAt: timestamp("uploaded_at").defaultNow().notNull(),
});