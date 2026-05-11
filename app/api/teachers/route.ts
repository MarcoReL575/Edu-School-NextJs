import { usersService } from "@/src/features/clases/services/UsersService"


export async function GET() {

    const teachersList = await usersService.getAllTeachers();

    return new Response(JSON.stringify(teachersList), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    })
}