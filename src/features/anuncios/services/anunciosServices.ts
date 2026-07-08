import { IUsersRepository, usersRepository } from "../../clases/services/UsersRepository";
import { INotificationPublisher, notificationPusher } from "../../notifications/services/NotificationPusher";
import { INotificationRepository, notificationRepository } from "../../notifications/services/notificationRepository";
import { AnunciosInsert } from "../types/types";
import { announceRepository, IAnnounceRepository } from "./anunciosRepository";

class AnnounceService {
    constructor(
        private announceRepository: IAnnounceRepository,
        private notificationRepository : INotificationRepository,
        private usersRepository : IUsersRepository,
        private notificationPusher: INotificationPublisher
    ){}

    async createAnnounce(announce: AnunciosInsert, userId: string) {
        try {
            //1. Insertamos anuncio en base de datos
            await this.announceRepository.insertAnnounce(announce, userId);

            //2.Buscamos a los usuarios que deben recibir la notificación 
            let targetUsers: {id: string}[]= [];
            if (announce.targetType === 'all') {
                targetUsers = await this.usersRepository.selectUserByRole(['estudiante', 'maestro']);
            }

            if (announce.targetType === 'students') {
                targetUsers = await this.usersRepository.selectUserByRole(['estudiante']);
            }

            if (announce.targetType === 'teachers') {
                targetUsers = await this.usersRepository.selectUserByRole(['maestro']);
            }

            // 3. Si hay usuarios, creamos las notificaciones
            const notificationsPayload = targetUsers.map((user) => ({
                userId: user.id,
                title: `Nuevo aviso: ${announce.title}`,
                message: announce.content.substring(0, 120) + "...", // Un pequeño extracto del contenido
                type: 'announcement' as const, // Asegúrate de que este literal esté en tu Enum de notificaciones
                isRead: false,
                redirectUrl: '/dashboard/anuncios',
            }));

            const insertNotifications = await this.notificationRepository.insertMany(notificationsPayload);
            if (insertNotifications && insertNotifications.length > 0) {
                await notificationPusher.notifyMany(insertNotifications);
            }
            return { success: true, message: 'Anuncio creado' }
        } catch (error) {
            console.log(error)
            return { success: false, message: 'Error al crear anuncio' }
        }
    }

    async selectAnnounces() {
        try {
            const announces = await this.announceRepository.selectAnnonuces();
            return { success: true, message:'', announces }
        } catch (error) {
            return { success: true, message:'', announces: [] }
        }
    }
}

export const announceService = new AnnounceService(announceRepository, notificationRepository, usersRepository, notificationPusher);