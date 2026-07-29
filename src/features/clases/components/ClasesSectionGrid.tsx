
import { QueryClient, useQuery } from "@tanstack/react-query"
import { getStudentsSubjectsAction } from "../actions/clasesAction"
import CardClases from "./CardClases"

type Props = {
    groupId: string;
    studentId: string;
}

export default async function ClasesSectionGrid({ groupId, studentId }: Props) {

    const clases = await getStudentsSubjectsAction(groupId, studentId);

    if (!clases || clases.length === 0) {
        return (
            <div className="w-full text-center mt-5">
                <p>Aún no tienes clases asignadas, revisa el tema con algún director de la escuela.</p>
            </div>
        );
    }

  return ( 
    <section className="grid grid-cols-2 xl:grid-cols-3  gap-8">
        { clases.length 
            ?   clases.map((clase)=> (
                    <CardClases key={clase.id} clase={clase} />
                ))
            :   <p>
                    Aún no tienes clases Asignadas, Revisa el tema con algun director de la escuela
                </p>
        }
    </section>
  )
}
