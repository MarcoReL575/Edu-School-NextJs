import { db } from "@/src/db";
import { INotificationRepository, notificationRepository } from "../../notifications/services/notificationRepository";
import { AttendanceStudentTable, StatusAttendance } from "../types/types";
import { IAttendanceRepository, attendanceRepository } from "./attendanceRepository";
import { IUsersRepository, usersRepository } from "../../clases/services/UsersRepository";
import { NotificationType } from "../../notifications/types/types";
import { INotificationPublisher, notificationPusher } from "../../notifications/services/NotificationPusher";




class AttendanceService {
    constructor(
        private attendanceRepository: IAttendanceRepository,
        private notificationRepository: INotificationRepository,
        private usersRepository: IUsersRepository,
        private notificationPusher: INotificationPublisher
    ){}

    async takeAttendance(attendance: Record<string, boolean>, claseId: string) {
        return await db.transaction(async (tx) => {
            try {
                const today = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
                const studentIds = Object.keys(attendance);
                const studentsAttendance = Object.entries(attendance).map(([studentId, isPresent]) => ({
                    studentId: studentId,
                    claseId: claseId,
                    date: today,
                    status: isPresent ? "asistencia" : "falta" as StatusAttendance ,
                    remarks: "" 
                }));
                await this.attendanceRepository.insertAttendance(tx, studentsAttendance);

                //Obtener alumnos y notificar
                const studentsWithUsers = await this.usersRepository.selectUsersByStudentsId(tx, studentIds);
                const notifications = studentsWithUsers
                    .filter((student) => student.userId)
                    .map((student) => ({
                        userId: student.userId!,
                        title: "Asistencia",
                        message: "Se ha registrado tu asistencia",
                        type: "attendance" as NotificationType,
                        isRead: false,
                        redirectUrl: "/dashboard/attendance"
                    }));

                if (notifications.length > 0) {
                    const savedNotifictions = await this.notificationRepository.insertManyTransaction(tx, notifications);
                    
                    //Disparamos en tiempo real para cada notificación guardada
                    for(const notification of savedNotifictions) {
                        await this.notificationPusher.notify(notification);
                    }
                }

                return { success: true, message: 'Asistencia guardada' }
            } catch (error) {
                return { success: false, message: 'Error al guardar las asistencias' }
            }
        })
    }

    async getAttendancesByStudentId(stundetId: string) {
        try {
            const attendances = await this.attendanceRepository.selectAttendanceStudent(stundetId);
            return { success: true, message:'', attendances }
        } catch (error) {
            return { success: false, message:'error al obtener las asistencias', attendances: {} as AttendanceStudentTable[] }
        }
    }

    async getAttendanceStudentInClass(studentId: string, claseId: string) {
        try {
            const attendances = await this.attendanceRepository.selectAttendanceStudentByClass(studentId, claseId);
            return { success: true, message:'', attendances }
        } catch (error) {
            return { success: false, message:'error al obtener las asistencias', attendances: [] }
        }
    }
}

export const attendanceService = new AttendanceService(attendanceRepository, notificationRepository, usersRepository, notificationPusher);