import { db } from "@/src/db";
import { ClassGradesSelect } from "../types/types";
import { avg, eq } from "drizzle-orm";
import { classGrades } from "@/src/db/schema";

export interface IMisclasesRepository {
    selectClassGrades(studentId: string): Promise<ClassGradesSelect>;
}

class MisclasesRepository implements IMisclasesRepository {
    async selectClassGrades(studentId: string): Promise<ClassGradesSelect> {
        const [gradeResult] = await db
            .select()
            .from(classGrades)
            .where(eq(classGrades.studentId, studentId));
        return gradeResult;
    }
}

export const misclasesRepository = new MisclasesRepository();