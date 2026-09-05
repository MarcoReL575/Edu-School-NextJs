'use server'

import { requireAuth } from "@/src/lib/auth-server";
import { parentsService } from "../services/ParentsService";

export async function getTutorChildrenAction() {
    const { session } = await requireAuth();
    if (!session || session.user.role !== 'tutor') return [];

    return await parentsService.getChildrenByUserId(session.user.id);
}
