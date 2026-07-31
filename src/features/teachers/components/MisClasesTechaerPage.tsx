import { FullSession } from "@/src/lib/auth-server"
import { teacherService } from "../services/teacherService";
import CardClasesTeacher from "./CardClasesTeacher";
import Heading from "@/src/shared/components/typography/Heading";

type Props = {
  session: FullSession;
}

export default async function MisClasesTechaerPage({ session }: Props) {
  const teacherInfo = await teacherService.getTeacherByUserId(session.user.id);
  if(!teacherInfo.success || teacherInfo.teacher.userId === null) return <div>Error al cargar las materias del maestro</div>;

  const listOfClases = await teacherService.getTeachersClases(teacherInfo.teacher.id);

  return (
    <>
      <Heading level={2}>¡Bienvenido! Estas son las materias que impartes.</Heading>
      <section className="grid grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {listOfClases.clases.length 
          ?   listOfClases.clases.map((clase)=> (
              <CardClasesTeacher key={clase.id} clase={clase} />
            ))
          : <div>
              Aún no tienes materias asignadas
            </div>
        }
      </section>
    </>
  )
}
