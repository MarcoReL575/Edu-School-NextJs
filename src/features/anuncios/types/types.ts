import { announcements } from "@/src/db/schema";
import { insertAnnouncementSchema } from "../schemas/anuncios-schemas";
import z from "zod";

export type AnunciosSelect = typeof announcements.$inferSelect;
export type AnunciosInsert = typeof announcements.$inferInsert;

export type InsertAnnouncementInput = z.infer<typeof insertAnnouncementSchema>;