import CardTaskTeacher from "./CardTaskTeacher"
import { TaskTeacher } from "../types/types"

type Props = {
    taskList: TaskTeacher[]
}


export default function GridTaskTeacher({ taskList }: Props) {

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
