import { studentsService } from "@/src/features/students/services/StudentsService"

export async function GET() {
    const studentsList = await studentsService.getAllStudents();
    
    return new Response(JSON.stringify(studentsList), {
        status: 200,
        headers: {'Content-Type': 'application/json'}
    });
}