import ButtonOpenModalTask from "@/src/features/tasks/components/ButtonOpenModalTask";
import { teacherService } from "@/src/features/teachers/clases/teacherService";
import { requireAuth } from "@/src/lib/auth-server";
import Heading from "@/src/shared/components/typography/Heading";


export default async function TareasPage() {

  return (
    <>
        <div className="flex items-center justify-between">
            <div>
                <Heading level={2} className="">Tareas Asignadas</Heading>
                <p className="text-gray-500">Gestiona tus tareas. Crea y da seguimiento a las tareas que has dejado.</p>
            </div>
            <div>
                <ButtonOpenModalTask  />
            </div>
        </div>
    </>
  )
}
