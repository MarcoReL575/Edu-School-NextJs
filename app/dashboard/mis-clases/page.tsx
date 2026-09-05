
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { requireAuth } from "@/src/lib/auth-server"
import MisClasesStudentPage from "@/src/features/clases/components/MisClasesStudentPage";
import MisClasesTechaerPage from "@/src/features/teachers/components/MisClasesTechaerPage";
import MisClasesTutorPage from "@/src/features/clases/components/MisClasesTutorPage";

export const metadata: Metadata = {
  title: 'Edu-School: Mis Clases'
};

export default async function MisClases() {
  const { session } = await requireAuth();
  if(!session) redirect('/auth/signin');

  return (
    <div className="flex flex-col space-y-4 w-full max-w-7xl mx-auto">
      {session.user.role === 'estudiante' && <MisClasesStudentPage session={session} />}
      {session.user.role === 'maestro' && <MisClasesTechaerPage session={session} />}
      {session.user.role === 'tutor' && <MisClasesTutorPage session={session} />}
    </div>
  )
}


