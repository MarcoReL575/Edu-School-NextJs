'use client'

import { QueryClient, useQuery } from "@tanstack/react-query"
import { getTasksTeacherAction } from "../actions/tasksAction"
import CardTaskTeacher from "./CardTaskTeacher"

type Props = {
    teacherId: string
}


export default function GridTaskTeacher({ teacherId }: Props) {
   
    const { data: taskList, isLoading, isError } = useQuery({
        queryKey: ['tasksList', teacherId],
        queryFn: ()=> getTasksTeacherAction(teacherId),
    })

    if(isLoading) return <div>Cargando...</div>;
    if(isError) return <div>Error al cargar los datos, Vuelva a intentarlo</div>;

  return (
    <>
        { taskList?.length 
            ?   <section className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    { Array.isArray(taskList) && taskList.map((task)=> (
                        <CardTaskTeacher key={task.id} task={task} />
                    ))}
                </section>
            :   <div className="text-center font-semibold text-xl text-gray-400 mt-5">No hay tareas Disponibles, crea tareas para administrarlas aquí</div>
        }
    </>
    )
}
