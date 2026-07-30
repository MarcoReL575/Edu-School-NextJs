import { IAttendanceRepository, attendanceRepository } from "../../attendance/services/attendanceRepository";
import { IMisclasesRepository, misclasesRepository } from "./misclasesRepository";

class MisclasesService {
    constructor (
        private misclasesRepository: IMisclasesRepository,
        private attendanceRepository: IAttendanceRepository,
    ) {}

    async getStudentMetrics(studentId: string) {
        // 1. Obtener el Promedio General de la tabla classGrades
        const globalScore = await misclasesRepository.selectClassGrades(studentId);

        // 2. Obtener Asistencias Totales y Registros Totales
        // Asumiendo que status 1 = Presente / Asistió (o adaptarlo a tu lógica de status)
        const totalAttendaces = await attendanceRepository.selectTotalAttendance(studentId);

        // 3. Formatear y calcular los valores finales
        const avgScore = globalScore.finalGrade 
            ? parseFloat(Number(globalScore.finalGrade).toFixed(1)) 
            : 0;

        const total = totalAttendaces?.totalClasses || 0;
        const attended = totalAttendaces?.attendedClasses || 0;
        
        // Porcentaje de asistencia (ej. 92.5%)
        const attendancePercentage = total > 0 
            ? `${((attended / total) * 100).toFixed(1)}%` 
            : "100%";

        return {
            globalAverage: avgScore,
            attendancePercentage,
            attendedCount: attended,
            totalClassesCount: total,
        };
    }
}

export const misclasesService = new MisclasesService(misclasesRepository, attendanceRepository);