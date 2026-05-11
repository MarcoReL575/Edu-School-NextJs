import { subjectsService } from "@/src/features/clases/services/SubjectsService";

export async function GET() {
    const subjectsList = await subjectsService.getAllSubjects();

    return new Response(JSON.stringify(subjectsList), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    })
}