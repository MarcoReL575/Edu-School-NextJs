'use client'

import { useSuspenseQuery } from "@tanstack/react-query"
import { getStudentsSubjectsAction } from "../actions/clasesAction"
import CardClases from "./CardClases"

type Props = {
    groupId: string
}

export default function ClasesSectionGrid({ groupId }: Props) {

    const { data: clases, isError, isLoading} = useSuspenseQuery({ 
        queryKey: ['miSubjects', groupId], 
        queryFn: async()=> await getStudentsSubjectsAction(groupId) 
    });

    if(isLoading) return <div>Cargando mis Clases</div>
    if(isError) return <div>Error al obtener las clases. Intente de nuevo</div>
    console.log(clases)

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
