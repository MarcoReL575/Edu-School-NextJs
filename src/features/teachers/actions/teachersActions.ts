import { teacherService } from "../clases/teacherService";

export async function getInfoTeachersClases(claseId: string) {
    const clases = await teacherService.getAllInfoClase(claseId);
    return clases
}