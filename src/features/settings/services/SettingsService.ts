import { ISettingsRepository, settingsRepository } from "./SettingsRepository";
import { UpdateProfileProps } from "../schemas/settings-schemas";

class SettingsService {
    constructor(
        private settingsRepository: ISettingsRepository
    ) {}

    async getProfile(userId: string) {
        const foundUser = await this.settingsRepository.selectUserById(userId);
        if (!foundUser) return undefined;

        const [name, ...rest] = foundUser.name.split(' ');
        return {
            id: foundUser.id,
            name: name ?? '',
            lastName: rest.join(' '),
            email: foundUser.email,
            role: foundUser.role,
        }
    }

    async updateProfile(userId: string, currentEmail: string, data: UpdateProfileProps) {
        if (data.email !== currentEmail) {
            const emailTaken = await this.settingsRepository.selectUserByEmail(data.email);
            if (emailTaken && emailTaken.id !== userId) {
                return { success: false, message: 'Ese correo ya está en uso' }
            }
        }

        const fullName = `${data.name} ${data.lastName}`.trim();
        await this.settingsRepository.updateNameAndEmail(userId, fullName, data.email);

        if (data.newPassword) {
            const { success, message } = await this.settingsRepository.changePassword(data.currentPassword!, data.newPassword);
            if (!success) return { success: false, message }
        }

        return { success: true, message: 'Perfil actualizado correctamente' }
    }
}

export const settingsService = new SettingsService(settingsRepository);
