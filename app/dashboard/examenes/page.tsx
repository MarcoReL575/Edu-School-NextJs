import StudentExamPage from "@/src/features/examenes/components/StudentExamPage";
import TeacherExamenPage from "@/src/features/examenes/components/TeacherExamenPage";
import { requireAuth } from "@/src/lib/auth-server";
import { redirect } from "next/navigation";

export default async function ExamenesPage() {

    const { session } = await requireAuth();
    if(!session.user) redirect('/auth/signin');

    const role = session.user.role;

    return (
        <div className="flex flex-col justify-between space-y-8 max-w-7xl mx-auto w-full">
            {role === 'maestro' && <TeacherExamenPage userId={session.user.id} />}
            {role === 'estudiante' && <StudentExamPage userId={session.user.id} />}
        </div>
    )
}

