import { clasesServices } from "@/src/features/clases/services/ClasesServices";
import CreateExam from "@/src/features/examenes/components/CreateExam";
import { teacherService } from "@/src/features/teachers/clases/teacherService";
import { requireAuth } from "@/src/lib/auth-server";
import Heading from "@/src/shared/components/typography/Heading";
import { Button } from "@/src/shared/components/ui/button";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { redirect } from "next/navigation";


export default async function TeacherExamBuilderPage() {
    const { session } = await requireAuth();
    if(session.user.role !== 'maestro') redirect('/auth/signin');

    const { teacher } = await teacherService.getTeacherByUserId(session.user.id);
    const { success, clases } = await teacherService.getTeachersClases(teacher.id);

    if(!success) return <div>Error al cargar las materias</div>

  return (
    <>
        <section className="flex w-full flex-col sm:flex-row sm:items-center gap-4 border-b border-gray-100 pb-4 ">
            <div>
                <Link href={'/dashboard/examenes'}>
                    <Button variant='outline'>
                        <IconArrowLeft />
                    </Button>
                </Link>
            </div>
            <div>
                <Heading level={3} className="text-sm text-gray-500 mt-1">Volver a página de Exámenes</Heading>
                <Heading level={2}>Crear nueva evaluación</Heading>
            </div>
        </section> 
        <CreateExam clases={clases}/> 
    </>
  )
}