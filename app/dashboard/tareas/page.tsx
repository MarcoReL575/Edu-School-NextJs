import ButtonOpenModalTask from "@/src/features/tasks/components/ButtonOpenModalTask";
import PageTasksTeacher from "@/src/features/tasks/components/PageTasksTeacher";
import TaskGrid from "@/src/features/tasks/components/TaskGrid";
import TareasTutorSection from "@/src/features/tasks/components/TareasTutorSection";
import { teacherService } from "@/src/features/teachers/services/teacherService";
import { requireAuth } from "@/src/lib/auth-server";
import Heading from "@/src/shared/components/typography/Heading";


export default async function TareasPage() {

    const { session } = await requireAuth();
    const role = session.user.role;
    
  return (
    <>
        <div className="flex items-center justify-between">
            <div>
                <Heading level={2} className="">Tareas Asignadas</Heading>
                <p className="text-gray-500">Gestiona tus tareas. Crea y da seguimiento a las tareas que has dejado.</p>
            </div>
            <div>
                {role === 'maestro' && <ButtonOpenModalTask teacherId={session.user.id} />}
            </div>
        </div>
        <main>
            { role === 'estudiante' && <TaskGrid userId={session.user.id} /> }
            { role === 'maestro'  && <TechaerTasksList userId={session.user.id} /> }
            { role === 'tutor' && <TareasTutorSection /> }
        </main>
    </>
  )
}

//Componente Auxiliar
async function TechaerTasksList({ userId }: { userId: string }) {
    const { teacher } = await teacherService.getTeacherByUserId(userId);
    if(!teacher) return <div>No se encontró información del profesor</div>;
    return <PageTasksTeacher teacherId={teacher.id} />
}
