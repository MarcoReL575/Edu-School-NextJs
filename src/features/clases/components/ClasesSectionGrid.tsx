'use client'

import { useSuspenseQuery } from "@tanstack/react-query"
import { getStudentsSubjectsAction } from "../actions/clasesAction"
import CardClases from "./CardClases"

type Props = {
    groupId: string;
    studentId: string;
}

export default function ClasesSectionGrid({ groupId, studentId }: Props) {

    const { data: clases} = useSuspenseQuery({ 
        queryKey: ['miSubjects', groupId], 
        queryFn: async()=> await getStudentsSubjectsAction(groupId, studentId),
        staleTime: 5 * 60 * 1000
    });

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
