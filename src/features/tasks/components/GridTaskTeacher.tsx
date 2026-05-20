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
    <section className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        { Array.isArray(taskList)   
            ?   taskList.map((task)=> (
                    <CardTaskTeacher key={task.id} task={task} />
                ))
            :   <div>No hay tareas Disponibles</div>
        }
    </section>
  )
}
