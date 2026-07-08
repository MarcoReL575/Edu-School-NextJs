'use server'

import { requireAuth } from "@/src/lib/auth-server"
import { redirect } from "next/navigation";
import { announceService } from "../services/anunciosServices";
import { AnunciosInsert } from "../types/types";

export async function createAnnounceAction(anounce: AnunciosInsert) {
    const { session } = await requireAuth();
    if(!session.user) redirect('/auth/signin');

    if(session.user.role !== 'admin')  return { success: false, message: 'El usuario no tiene los permisos necesarios' } 

    return await announceService.createAnnounce(anounce, session.user.id);
}