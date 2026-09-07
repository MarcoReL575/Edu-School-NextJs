import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { db } from "@/src/db";
import { user } from "@/src/db/schema";
import { auth } from "@/src/lib/auth";
import { APIError } from "better-auth";

export interface ISettingsRepository {
    selectUserById(userId: string): Promise<typeof user.$inferSelect | undefined>;
    selectUserByEmail(email: string): Promise<typeof user.$inferSelect | undefined>;
    updateNameAndEmail(userId: string, name: string, email: string): Promise<void>;
    changePassword(currentPassword: string, newPassword: string): Promise<{ success: boolean; message: string }>;
}

class SettingsRepository implements ISettingsRepository {
    async selectUserById(userId: string) {
        const [foundUser] = await db
            .select()
            .from(user)
            .where(eq(user.id, userId))
        return foundUser;
    }

    async selectUserByEmail(email: string) {
        const [foundUser] = await db
            .select()
            .from(user)
            .where(eq(user.email, email))
        return foundUser;
    }

    async updateNameAndEmail(userId: string, name: string, email: string): Promise<void> {
        await db
            .update(user)
            .set({ name, email })
            .where(eq(user.id, userId))
    }

    async changePassword(currentPassword: string, newPassword: string): Promise<{ success: boolean; message: string }> {
        try {
            await auth.api.changePassword({
                body: { currentPassword, newPassword },
                headers: await headers(),
            })
            return { success: true, message: 'Contraseña actualizada' }
        } catch (error) {
            if (error instanceof APIError) {
                return { success: false, message: 'La contraseña actual es incorrecta' }
            }
            return { success: false, message: 'No se pudo actualizar la contraseña' }
        }
    }
}

export const settingsRepository = new SettingsRepository();
