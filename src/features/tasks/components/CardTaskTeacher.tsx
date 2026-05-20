import Link from "next/link"
import { Route } from "next"
import Heading from "@/src/shared/components/typography/Heading"
import { getCorrectDate } from "../helpers/getCorrectDate"
import { getColorBySubject } from "../../clases/components/TableHorarioClases"
import { TaskTeacher } from "../types/types"
import { IconCalendar, IconUsers } from "@tabler/icons-react"

type Props = {
    task: TaskTeacher
}

export default function CardTaskTeacher({ task }: Props) {
  return (
    <div className="border border-gray-400 p-4 rounded-lg space-y-2">
        <div className={`text-center ${ getColorBySubject(task.subjectName)}`}>
            <Heading level={4} className="text-gray-500">{task.subjectName}</Heading>
            <Heading level={5}>{task.title}</Heading>
        </div>
        <div className="flex flex-col space-y-2">
            <p>{task.description}</p>
            <p className="flex items-center justify-between">
                <span>Grupo: </span>
                <span>{task.gradeName}{task.groupName}</span>
            </p>
            <p className="flex items-center justify-between">
               <span> Fecha Entrega:</span> 
               <span className="flex items-center gap-x-2"> {getCorrectDate(task.fechaEntrega)}<IconCalendar /></span>
            </p>
            <p className="flex items-center justify-between">
                <span>Entregadas: </span>
                <span className="flex items-center gap-x-2"> 20/30<IconUsers /></span>
            </p>
        </div>
        <div className="flex items-center justify-end mt-4"> 
            <Link 
                href={`/dashboard/tareas/${task.id}` as Route}
                className="w-fit px-4 rounded-lg py-2 bg-black text-white cursor-pointer hover:bg-black/60 transition-colors duration-300 ease-in"
            >
                Ver más
            </Link>
        </div>
    </div>
  )
}
