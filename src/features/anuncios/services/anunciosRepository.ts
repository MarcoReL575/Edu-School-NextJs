import { db } from "@/src/db";
import { AnunciosInsert, AnunciosSelect, InsertAnnouncementInput } from "../types/types";
import { announcements } from "@/src/db/schema";
import { asc, desc } from "drizzle-orm";

export type IAnnounceRepository = {
    insertAnnounce(announce: AnunciosInsert, userId: string): Promise<void>;
    selectAnnonuces(): Promise<AnunciosSelect[]>
}

class AnnounceRepository implements IAnnounceRepository {
    async insertAnnounce(announce: AnunciosInsert, userId: string): Promise<void> {
        await db
            .insert(announcements)
            .values({
                authorId: userId,
                content: announce.content,
                title: announce.title,
                targetType: announce.targetType,
            })
    }

    async selectAnnonuces(): Promise<AnunciosSelect[]> {
        const result = await db
            .select()
            .from(announcements)
            .orderBy(desc(announcements.createdAt))
        return result
    }
}

export const announceRepository = new AnnounceRepository();